import "reflect-metadata";
import mongoose from "mongoose";
import {  DbUrl } from "./Config/auth.config.";
import * as dotenv from "dotenv";
import { ApolloServer} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import express from "express";
import { GoogleAuth } from "./Config/google.auth";
import { IsAuthorized } from "./Utilities/IsAuthorized";
import { Context } from "apollo-server-core";
import { customAuthChecker } from "./Utilities/custom-auth-check";

dotenv.config();



async function App() {
    const app = express();
    const port = process.env.PORT;
    // app.use(IsAuthorized)
    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
        container: Container,
        authChecker: customAuthChecker,
    });
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
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


    apolloServer.applyMiddleware({ app });
    //@ts-ignore
    await mongoose.connect(DbUrl, {
        autoIndex: true,
    })
        .then(() => {
        mongoose.set('debug', true)
        app.listen(port, ()=>{
            console.log(`app listen on port ${port}`);
        });
        })
        .catch(err => {
        console.log(err);
    });
}

App();
