import { Schema } from "mongoose";
import { Field, ObjectType, } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { SubCategory } from "../SubCategories/SubCategory.model";



@ObjectType()
export class Category extends Schema {

    @Field(()=> String)
    _id:string

    @Field(() => String)
    @prop()

    category_name?: string;

    @prop({ ref: "SubCategoryModel" })
    public subCategory_id: Ref<SubCategory>;

    
    @prop({ ref: "ProductModel" })
    public products: Ref<Product>;



}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } })
