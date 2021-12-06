import { mongoose } from "@typegoose/typegoose";
import { InputType, ArgsType, Field } from "type-graphql";


@ArgsType()
export class LocationArgs {

    @Field(() => mongoose.Types.ObjectId)
    _id: mongoose.Types.ObjectId;

}