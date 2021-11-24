import {  Date, Model, PromiseProvider, Schema } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";



@ObjectType()
export class Store extends Schema {

    @Field(() => ID)
    @prop()
    //@ts-ignore
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

    @Field(()=> String)
    @prop()
        //@ts-ignore
    created_at?: Date

    @Field(() => String)
    @prop()
    updated_at?: Date

    @Field(() => String)
    token: string

}

export const StoreModel = getModelForClass(Store)
