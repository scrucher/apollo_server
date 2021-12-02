import { Schema } from "mongoose";
import { Authorized, Field, ObjectType, ID } from "type-graphql";
import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { v4 } from "uuid";



@ObjectType()
export class User extends Schema {

    @Field(() => String)
    @prop({
        type: String,
        default: v4(),
    })
   _id: string

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
    @prop({
        typre: Array
    })
    image?: string

    @Field(() => String)
    token: string

    @Authorized("USER")
    @Field({ nullable: true })
    hiddenField?: string;

}

export const UserModel = getModelForClass(User, {schemaOptions: {timestamps: true}})
