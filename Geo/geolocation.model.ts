import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../Users/Users.model";
import { Store } from "../Store/Store.model";



@ObjectType()
export class Location extends Schema {

    @Field(() => String)
    _id: string


    @Field(() => String)
    @prop({
        type: String,
        enum: ["Point"],
        required: true,
    })
    type?: string;

    @Field(() => [Number])
    @prop({
        type: [Number],
        required: true,
    })
    coordinates?: number[];


    @prop({ ref: "UserModel" })
    public client: Ref<User>;

    @prop({ ref: "StoreModel" })
    public store: Ref<Store>

    @prop({ ref: "DriverModel" })
    public driver: Ref<Store>



}

export const LocationModel = getModelForClass(Location, { schemaOptions: { timestamps: true } })
