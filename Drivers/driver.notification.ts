import { Schema } from "mongoose";
import { Field, ObjectType, } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Order } from "../Orders/Order.model";
import { Store } from "../Store/Store.model";
import { User } from "../Users/Users.model";


@ObjectType()

export class DriverNotifications extends Schema {

    @Field(() => String)
    _id: string

    @Field(() => Date)
    @prop()
    date?: Date;

    @prop({ ref: Order })
    public orders: Ref<Order>[];


    @prop({ ref: Store })
    public stores: Ref<Store>[];

    @prop({ ref: User })
    public users: Ref<User>[];



}

export const DriverNotificationsModel = getModelForClass(DriverNotifications, { schemaOptions: { timestamps: true } })
