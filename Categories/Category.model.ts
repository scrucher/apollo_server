import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";



@ObjectType()
export class Category extends Schema {

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

    @Field(()=> String)
    @prop({
        type: Array,
    })
    images?: string;

    @Field(() => String)
    @prop({
        type: String,
    })
    price?: string;


}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } })
