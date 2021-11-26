import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";



@ObjectType()
export class Store extends Schema {

    @Field(() => ID)
    @prop({
        type: String,
    })
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

    @Field(() => String)
    @prop()
    adress?: string

    @Field(() => String)
    @prop()
    image?: string

    @Field(() => String)
    @prop({
        type: String,
        enum: ["STORE", "DRIVER", "VISITOR"],
        default: "VISITOR",
    })
    role?: string

    @Field(() => Boolean || null)
    @prop({
        type: Boolean || null ,
        enum: [false, true],
        addNullToEnum: true,
    })
    IsActive?: boolean

    @Field(() => String)
    token: string

}

export const StoreModel = getModelForClass(Store, {schemaOptions: {timestamps: true}})
