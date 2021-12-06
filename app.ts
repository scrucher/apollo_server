import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express, { Application} from "express";
import Container from "typedi";
import { GoogleAuth } from "./Api/google.auth";
import { customAuthChecker } from "./Utilities/custom-auth-check";
import * as StaticFiles from "node-static";
import cors from "cors";
import path from 'path'

import { IsAuthorized } from "./Utilities/IsAuthorized";
import { LocationService } from "./Geo/Location.Service";
import { LocationInput } from "./Geo/location.input";


const app: Application = express()

export async function App() {
    const files = new StaticFiles.Server("./public")
    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
        container: Container,
        authChecker: customAuthChecker,
    });
    app.use(cors());
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            process.env.NODE_ENV === "production"
                ? ApolloServerPluginLandingPageProductionDefault()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: async ({ req }) => {
            const user = await IsAuthorized(req);
            //@ts-ignore
            req.user = user
            // const locationInput: LocationInput = req.body
            // const UpdateLocation = LocationService.updateLocation(locationInput, req)
            const context = {
                req,
                //@ts-ignore
                user: req.user, // `req.user` comes from `express-jwt`
            };
            return context;
        },
        
    });
    await apolloServer.start()
    app.use("/callback/googleauth", async (req, res) => {
        console.log(req.query.code)
        const data = req.query.code
        const Resolver = new GoogleAuth();
        //@ts-ignore
        const result = Resolver.getGoogleAccountFromCode(data)
        console.log(result);
        return res.send("hello")
    })
    app.get("/",(req, res) => {
        // req.addListener('end', function () {
        //     files.serve(req, res);
        // })
        res.sendFile(__dirname + "/public/map.html", (err: any, data: any) => {
            console.log("randome log")
            console.log(err);
            return data;
        })
        console.log('data')
    })
    // app.use('/static', express.static(path.join(__dirname, 'public')));
    apolloServer.applyMiddleware({ app });

}

export default app;
