import { mongoose } from "@typegoose/typegoose";
import {ArgsType, Field, ID, InputType } from "type-graphql";

@ArgsType()
@InputType()
export class MessageInput{

    @Field(()=> ID)
   receiver: mongoose.Types.ObjectId;

    @Field(() => String)
   message_body: string;

}
