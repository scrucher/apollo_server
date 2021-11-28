import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { User } from "../Users/Users.model";



@ObjectType()
export class Product extends Schema {

    @Field(()=> String)
    _id:string

    @Field(() => String)
    @prop()

    product_name?: string;

    @Field(() => String)
    @prop()
    description?: string;

    @Field(() => String)
    @prop()
    details?: string;

    @Field()
    @prop({
        type: Array,
    })
    images?: string;

    @Field(() => String)
    @prop({
        type: String,
    })
    price?: string;

    @Field(() => ID)
    @prop({
        type: mongoose.Types.ObjectId,
        ref: "Store"
    })
    user?: string;



}

export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } })
