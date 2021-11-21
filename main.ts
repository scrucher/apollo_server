import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { DbConnectionOptions, DbUrl } from "./Config/auth.config.";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import { StoreResolver } from "./Resolvers/Store.resolver";


async function App() {

    const app = express ()
    const schema = await buildSchema({
        resolvers: [StoreResolver],
    });
    app.use("/graphql", graphqlHTTP({
        schema,
        //@ts-ignore
        playground: true,
        loadResolversFromGlob: true,
        useUrlParser: true,
        
    }))
    await mongoose.connect(DbUrl, DbConnectionOptions)
    .then( ()=> {
        app.listen(3000, ()=>{
            console.log("app listen on port 3000");
        });
    })
    .catch( err => {
        console.log(err);
    });

}

App();