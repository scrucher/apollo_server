import { Service } from "typedi";
import * as crypto from "crypto";
import { v4 } from "uuid";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { OrderModel, Order } from "./Order.model";
import { OrderInput } from "./Order.input";
import { OrderArgs } from "./Order.args";
import { Context } from "apollo-server-core";

@Service('Order_Service')
export class OrderService {

    async CreateOrder(orderInput: OrderInput, context: Context): Promise<Order> {
        const user = "";
        const order = new OrderModel();
        //@ts-ignore
        order.products = orderInput.products;
        order.store = orderInput.store;
        order.client = user

        let saved;
        try {
            saved = await OrderModel.create(order)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Order");
        }
        console.log(saved);
        return saved;
    }


    async GetAllOrders():Promise <Order[]> {
        let found;
        try {
            found = await OrderModel.find()
        } catch (err) {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        }

        return found;
    }

    async GetOrderById(_id: string): Promise<Order> {
        const found = await OrderModel.findById(_id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;

    }

    async DeleteOrder(orderArgs: OrderArgs, context : Context): Promise<void | any> {
        const _id = orderArgs;
        let deleted;
        try {
            deleted = await OrderModel.deleteOne(_id)
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        }
        if (deleted.deletedCount === 0) {
            return ("Product Deleted Successfully")
        }
    }

    async UpdateOrder(orderInput: OrderInput, orderArgs: OrderArgs): Promise<void> {
        const { _id } = orderArgs
        const update = orderInput;
        let updated: any;
        try {
            //@ts-ignore
            updated = await OrderModel.update({_id: _id}, update, {
                upsert: true,
            });
        } catch (err) {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        }

        return updated;

    }

}
