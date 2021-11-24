import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { GraphQLSchema } from "graphql";



// const schema = buildSchema({
//     resolvers: ["./**/*.resolver.ts"],
//     container: Container,
//     });
// const apolloServer = new ApolloServer({
//     schema,
//     context: () => {
//         // generate the requestId (it also may come from `express-request-id` or other middleware)
//         const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
//         //@ts-ignore
//         const container = Container.of(requestId); // get the scoped container
//         const context = { requestId, container }; // create fresh context object
//         container.set("context", context); // place context or other data in container
//         return context;
//     },
//     // plugins: [
//     //     {
//     //         requestDidStart: ()=> ({
//     //             willSendResponse(requestContext:any) {
//     //                 // remember to dispose the scoped container to prevent memory leaks
//     //                 Container.reset(requestContext.context.requestId);
//     //             },
//     //         }),
//     //     },
//     // ],


// });
// export default apolloServer;