import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { Category } from "../Categories/Category.model";



@ObjectType()
export class SubCategory extends Schema {

    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop()
    sub_category_name?: string

    @Field(() => ID)
    @prop({ ref: "CategoryModel" })
    public category_id: Ref<Category>;

    @prop({ ref: "ProductModel" })
    public products: Ref<Product>;



}

export const SubCategoryModel = getModelForClass(SubCategory, { schemaOptions: { timestamps: true } })
