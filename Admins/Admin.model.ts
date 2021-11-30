import { Schema } from "mongoose";
import { Authorized, Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { v4 } from "uuid";



@ObjectType()
export class Admin extends Schema {

    @Field(() => String)
    @prop({
        type: String,
        default: v4(),
    })
    _id: string


    @Field(() => String)
    @prop()

    user_name?: string;

    @Field(() => String)
    @prop()
    email?: string;

    @prop()
    salt?: string;

    @Field(() => String)
    @prop()
    password?: string;

    @Field(() => String)
    @prop()
    phone?: string

    @Field(() => String)
    @prop({
        type: String,
        default: "Admin",
    })
    role?: string


    @Field(() => String)
    token: string

    @Authorized("ADMIN")
    @Field({ nullable: true })
    hiddenField?: string;

}

export const AdminModel = getModelForClass(Admin, {schemaOptions: {timestamps: true}})
