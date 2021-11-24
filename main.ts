import "reflect-metadata";
import mongoose from "mongoose";
import {  DbUrl } from "./Config/auth.config.";
import * as dotenv from "dotenv";
import { ApolloServer} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import express from "express";
import { StoreResolver } from "./Store/Store.resolver";

dotenv.config();


async function App() {
    const app = express();
    const port = process.env.PORT;
    const schema = await buildSchema({
        resolvers: [StoreResolver],
        container: Container,
    });
    const apolloServer = new ApolloServer({
        schema,
        context: () => {
            // generate the requestId (it also may come from `express-request-id` or other middleware)
            const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
            //@ts-ignore
            const container = Container.of(requestId); // get the scoped container
            const context = { requestId, container }; // create fresh context object
            container.set("context", context); // place context or other data in container
            return context;
        },
        // plugins: [
        //     {
        //         requestDidStart: ()=> ({
        //             willSendResponse(requestContext:any) {
        //                 // remember to dispose the scoped container to prevent memory leaks
        //                 Container.reset(requestContext.context.requestId);
        //             },
        //         }),
        //     },
        // ],


    });
    await apolloServer.start();
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