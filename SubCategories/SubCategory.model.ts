import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { User } from "../Users/Users.model";



@ObjectType()
export class SubCategory extends Schema {

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

    @prop({
        type: mongoose.Types.ObjectId,
        ref: "User",
    })
    user: User;


}

export const SubCategoryModel = getModelForClass(SubCategory, { schemaOptions: { timestamps: true } })
