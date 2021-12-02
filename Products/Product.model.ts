import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, modelOptions, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Store, StoreModel } from "../Store/Store.model";
import { Category } from "../Categories/Category.model";
import { SubCategory } from "../SubCategories/SubCategory.model";


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

    @prop({ ref: "StoreModel"})
    public store_id: Ref<Store>;

    @prop({ ref: "CategoryModel" })
    public category_id: Ref<Category>;

    @prop({ ref: "SubCategoryModel" }) 
    public subCategory_id: Ref<SubCategory>;


}

export const ProductModel = getModelForClass(Product)
