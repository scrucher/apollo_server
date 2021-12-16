import { Schema } from "mongoose";
import { Field, ID, Int, ObjectType, } from "type-graphql";
import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
import { User } from "../Users/Users.model";
import { Store } from "../Store/Store.model";



@ObjectType()
export class Order extends Schema {

    @Field(() => String)
    _id: string

    // @Field(() => String)
    // @prop()

    // sub_category_name?: string;

    @Field(() => String)
    @prop({
        type: String,
        enum: ["In Progress", "On The Way", "Arrived"]
    })
    
    @Field(() => String)
    @prop()
    total_price: string

    @Field(() => [String])
    route: [string]


    @prop({ ref: "UserModel" })
    public client: Ref<User>;


    @Field(()=> [ID])
    @prop({ ref: "ProductModel" })
    public products: Ref<Product>[];

    @prop({ref: "StoreModel"})
    public store: Ref<Store>

    @prop({ ref: "DriverModel" })
    public driver: Ref<Store>



}

export const OrderModel = getModelForClass(Order, { schemaOptions: { timestamps: true } })
