import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { Category } from "../Categories/Category.model";



@ObjectType()
export class SubCategory extends Schema {

    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop()

    sub_category_name?: string;

    @Field(() => ID)
    @prop({
        type: mongoose.Types.ObjectId,
        ref: "Store"
    })
    products?: Product[];

    @Field(() => ID)
    @prop({
        type: mongoose.Types.ObjectId,
        ref: "Store"
    })
    category?: Category;



}

export const SubCategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } })
