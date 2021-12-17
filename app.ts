import { buildSchema } from "type-graphql";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
    , ApolloServerPluginLandingPageProductionDefault
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express, { Application} from "express";
import Container from "typedi";
import { GoogleAuth } from "./Api/google.auth";
import { customAuthChecker } from "./Utilities/custom-auth-check";
import cors from "cors";
import { IsAuthorized } from "./Utilities/IsAuthorized";
import { Server } from "http";


const app: Application = express()

export async function App() {
    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
        container: Container,
        authChecker: customAuthChecker,
    });
    app.use(cors());

    // app.use();
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            process.env.NODE_ENV === "production"
                ? ApolloServerPluginLandingPageProductionDefault()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],

        context: async ({ req, res }) => {
            // const user = await IsAuthorized(req);
            // //@ts-ignore
            // req.user = user
            const context = {
                // req,
                // //@ts-ignore
                // user: req.user, // `req.user` comes from `express-jwt`

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

        res.sendFile(__dirname + "/public/map.html", (err: any, data: any) => {
            console.log("randome log")
            console.log(err);
            return data;
        })
        console.log('data')
    })
    apolloServer.applyMiddleware({ app });
}

export default app;
