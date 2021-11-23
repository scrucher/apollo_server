import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { DbConnectionOptions, DbUrl } from "./Config/auth.config.";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import { StoreResolver } from "./Store/Store.resolver";
import Container from "typedi";


async function App() {
    const app = express ()
    const schema = await buildSchema({
        resolvers: [StoreResolver],
    });
    // app.use("/graphql", graphqlHTTP({
    //     schema,

    // }))    
    const apolloServer = new ApolloServer({
        schema,
        context: {},
        
    });
    await apolloServer.start();
    //@ts-ignore
    apolloServer.applyMiddleware({ app });
    await mongoose.connect(DbUrl, {
        autoIndex: true,
    })
        .then(() => {
        mongoose.set('debug', true)
        app.listen(3000, ()=>{
            console.log("app listen on port 3000");
        });
        })
        .catch(err => {
        console.log(err);
    });       

}

App();