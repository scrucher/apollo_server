import { Schema } from "mongoose";
import { Authorized, Field, ObjectType, } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";



@ObjectType()
export class User extends Schema {

   

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
    @prop({
        typre: Array
    })
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

    @Authorized("USER")
    @Field({ nullable: true })
    hiddenField?: string;

}

export const UserModel = getModelForClass(User, {schemaOptions: {timestamps: true}})
