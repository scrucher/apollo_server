import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { User } from "../Users/Users.model";
import { Store } from "../Store/Store.model";
import { Driver } from "../Drivers/Driver.model";



@ObjectType()
export class Message extends Schema {

    @Field(() => String)
    _id: string
    
    @Field(() => String)
    @prop()
    message_body: string

    @Field(() => String)
    @prop({
        type: String,
        enum: ["sent", "received", "seen"],
        default: "sent"
    })
    status?: string;




    // @Field(()=> mongoose.Types.ObjectId)
    @prop({ ref: "ProductModel" || "StoreModel" || "DriverModel" })
    public receiver: Ref<Product | Store | Driver>;

    @prop({ ref: "ProductModel" || "StoreModel" || "DriverModel" })
    public sender: Ref<Product | Store | Driver>;

    // @prop({ref: "StoreModel"})
    // public sender: Ref<Store>

    // @prop({ ref: "DriverModel" })
    // public driver: Ref<Store>



}

export const MessageModel = getModelForClass(Message, { schemaOptions: { timestamps: true } })
