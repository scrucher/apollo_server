import { Schema } from "mongoose";
import { Field, ObjectType, } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Order } from "../Orders/Order.model";
import { Driver } from "../Drivers/Driver.model";
import { User } from "../Users/Users.model";


@ObjectType()

export class StoreNotifications extends Schema {

    @Field(() => String)
    _id: string

    @Field(() => Date)
    @prop()
    date?: Date;

    @prop({ ref: Order })
    public orders: Ref<Order>[];


    @prop({ ref: Driver })
    public drivers: Ref<Driver>[];

    @prop({ ref: User })
    public users: Ref<User>[];



}

export const StoreNotificationsModel = getModelForClass(StoreNotifications, { schemaOptions: { timestamps: true } })
