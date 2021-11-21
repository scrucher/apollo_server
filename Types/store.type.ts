import { gql } from "apollo-server-core";


export class StoreTypes {
    static Rsolver = gql`
    type Posts {
        id : ID,
        name: String,
        email: String,
    }
    type Query {
        hello: String 
        getAllposts : [Posts],

    }

`
}