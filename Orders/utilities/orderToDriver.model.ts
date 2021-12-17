import { Schema } from "mongoose";
import { Field, ObjectType, } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Order } from "../Order.model";
import { Driver } from "../../Drivers/Driver.model";



@ObjectType()
    
export class OrderToDriver extends Schema {

    @Field(() => String)
    _id: string

    @Field(() => Date)
    @prop()
    date?: Date;

    @prop({ ref: Order })
    public order: Ref<Order>;


    @prop({ ref: Driver })
    public driver: Ref<Driver>



}

export const OrderToDriverModel = getModelForClass(OrderToDriver, { schemaOptions: { timestamps: true } })
