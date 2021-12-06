import { mongoose } from "@typegoose/typegoose";
import {ArgsType, Field, ID, InputType } from "type-graphql";

@ArgsType()
@InputType()
export class OrderInput{

    @Field(() => [ID])
   products: mongoose.Types.ObjectId;

    @Field(() => ID)
   store: mongoose.Types.ObjectId;

}
