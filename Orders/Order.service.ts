import { Service } from "typedi";
import * as crypto from "crypto";
import { v4 } from "uuid";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { OrderModel, Order } from "./Order.model";
import { OrderInput } from "./Order.input";

@Service('Order_Service')
export class OrderService {

    async CreateOrder(orderInput: OrderInput): Promise <Order> {
        const { description, details, images, price  } = orderInput;

        const order = new OrderModel();
        order.description = description
        order.details = details;
        order.images = images;
        order.price = price;
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

    // async deleteStore(): Promise<void> {
    //     // const id =""
    //     // const deleted = await OrderModel.deleteOne()
    //     //     .then((data: any) => {
    //     //         return data
    //     //     })
    //     //     .catch((err: Error) => {

    //     // return deleted;

    // }
    // async updateStore(prodctInput: OrderInput):Promise<Order> {
    //     // const data = {};
    //     // const id = ""
    //     // const updated = await OrderModel.update(filter: "")
    //     //     .then((data: any) => {
    //     //         return data
    //     //     })
    //     //     .catch((err: Error) => {
    //     //         console.log(err);
    //     //         return ("Internal Server error");
    //     //     })

    //     // return updated;

    // }

}
