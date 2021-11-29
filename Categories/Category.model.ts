import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { SubCategory } from "../SubCategories/SubCategory.model";



@ObjectType()
export class Category extends Schema {

    @Field(()=> String)
    _id:string

    @Field(() => String)
    @prop()

    category_name?: string;

    @prop({
        type: mongoose.Types.ObjectId,
        ref: "Store"
    })
    products?: Product[];

    @prop({
        type: mongoose.Types.ObjectId,
        ref: "Store"
    })
    sub_categoris?: SubCategory[];



}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } })
