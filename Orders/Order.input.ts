import { mongoose } from "@typegoose/typegoose";
import { Field, ID, InputType } from "type-graphql";


@InputType()
export class OrderInput{

    @Field(() => String)

    total_price: string

    @Field(() => [ID])
   products: mongoose.Types.ObjectId;

    @Field(() => ID)
   store: mongoose.Types.ObjectId;

}
