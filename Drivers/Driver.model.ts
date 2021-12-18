import { Schema } from "mongoose";
import { Authorized, Field, ID, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { arrayProp } from "typegoose";



@ObjectType()
export class Driver extends Schema {

    @Field(() => ID)

    _id: mongoose.Types.ObjectId;


    @Field(() => String)
    @prop()
    
    username?: string;

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

    @Field(() => Boolean)
    @prop({
        type: Boolean,
        default: false,
    })
    busy?: boolean


    @Field(() => String)
    token: string

    @Field(() => [Number], { nullable: true })
    @prop({
        type: [Number],
        required: true,
    })
    location?: number[];

    // @Field(() => ID)
    // @prop({
    //     ref:"ProductModel",
    //     foreignField: "products",
    //     localField: "_id",
    //     justOne: false,
    // })
    // public products: Ref<Product>;


    @Authorized("Driver")
    @Field({ nullable: true })
    hiddenField?: string;

}

export const DriverModel = getModelForClass(Driver, {schemaOptions: {timestamps: true}})
