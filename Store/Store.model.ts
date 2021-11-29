import { Schema } from "mongoose";
import { Authorized, Field, ID, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";



@ObjectType()
export class Store extends Schema {

    @Field(() => ID)
    _id: string;

    @Field(() => String)
    @prop()
    
    store_name?: string;

    @Field(() => String)
    @prop()
    email?: string;

    @Field(() => String)
    @prop()
    password?: string;

    @prop()
    salt?: string;

    @Field(() => String)
    @prop()
    phone?: string

    @Field(()=> String)
    @prop()
    country?: string

    @Field(() => String)
    @prop()
    region?: string

    @Field(()=> String)
    @prop()
    city?: string

    @Field(() => String)
    @prop()
    adress?: string

    @Field(() => String)
    @prop()
    image?: string


    @Field(() => String)
    token: string

    @Field(() => ID)
    @prop({
        type: mongoose.Types.ObjectId,
        ref: "Product"
    })
    product?: Product[];

    @Authorized("STORE")
    @Field({ nullable: true })
    hiddenField?: string;

}

export const StoreModel = getModelForClass(Store, {schemaOptions: {timestamps: true}})
