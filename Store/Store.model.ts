import { Schema } from "mongoose";
import { Authorized, Field, ID, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { v4 } from "uuid";



@ObjectType()
export class Store extends Schema {

    // @Field(() => ID)
    // @prop({
    //     type: mongoose.Types.ObjectId,
    //     default: v4(),
    // })
    // _id: mongoose.Types.ObjectId;


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
        type: mongoose.Types.ObjectId  ,
        ref: Product,
        foreignField: "products",
        localField: "_id",
        justOne: false,
    })
    public products: Ref<Product>;

    @Authorized("STORE")
    @Field({ nullable: true })
    hiddenField?: string;

}

export const StoreModel = getModelForClass(Store, {schemaOptions: {timestamps: true}})
