import {  Date, Model } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";



@ObjectType()
export class Store{

    @Field(() => ID)
    @prop({ required: true, unique: true })
    //@ts-ignore
    id: string;

    @Field(() => String)
    @prop({required: true, unique: true})
    
    store_name?: string;

    @Field(() => String)
    @prop({required: true, unique: true})
    email?: string;

    @Field(() => String)
    @prop({required: true})
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

    @Field(()=> String)
    updated_at?: Date

}

export const StoreModel = getModelForClass(Store)
