import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Store, StoreModel } from "../Store/Store.model";



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
        ref: Store,
        foreignField: "store_id",
        localField: "_id",
        justOne: false,
    })
    store_id?: Ref<Store>;



}

export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } })
