
import { mongoose } from "@typegoose/typegoose";
import { MaxLength } from "class-validator";
import { StringValueNode } from "graphql";
import { ArgsType, Field, ID, Int, ObjectType } from "type-graphql";

const IMAGE = ""

@ArgsType()
@ObjectType()
export class ProductInput{
    
    @Field(() => String)
    @MaxLength(30)

    product_name?: string;

    @Field(() => String)
    @MaxLength(30)
    description?: string;

    @Field(() => String)
    @MaxLength(30)
    details?: string;

    @Field()
    @MaxLength(30)
    images?: string;

    @Field(() => String)
    @MaxLength(30)
    price?: string;


}
