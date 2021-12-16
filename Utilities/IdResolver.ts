import { GraphQLNonNull, GraphQLString } from "graphql";
import { Types } from 'mongoose';

export const IdResolver = {
    _id: {
        type: GraphQLNonNull(GraphQLString),
        description: "mongoose_id",
        resolve: ({_id}: {_id : Types.ObjectId}) => ({_id: _id.toString()}),
    }
}