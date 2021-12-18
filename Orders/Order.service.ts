import { Service } from "typedi";
import { InternalServerError} from "routing-controllers";
import { OrderModel, Order } from "./Order.model";
import { OrderInput } from "./Order.input";
import { OrderArgs } from "./Order.args";
import { Context } from "apollo-server-core";
import { GetDirection } from "../EstimateRoute";
import { UserModel } from "../Users/Users.model";
import { StoreModel } from "../Store/Store.model";
import { AssignOrderToDriver } from "../Orders/utilities/assignOrdertodriver";

@Service('Order_Service')
export class OrderService {

    async CreateOrder(orderInput: OrderInput, context: Context): Promise<Order> {
        const route = Array();
        //@ts-ignore
        const user_id = context.user._id;;
        const order = new OrderModel();
        //@ts-ignore
        order.products = orderInput.products;
        order.store = orderInput.store;
        order.client = user_id
        let saved;
        let rout;
        let driver;
        try {
            saved = await OrderModel.create(order)
            const store = await StoreModel.findOne({
                store: orderInput.store
            });
            const user = await UserModel.findOne({
                user: user_id,
            })
            console.log(store, user);
            const user_coordinates = user?.coordinates;
            const store_coordinares = store?.coordinates;
            console.log({user_coordinates, store_coordinares})
            rout = await GetDirection({ user_coordinates, store_coordinares })
            driver = await AssignOrderToDriver(store_coordinares, saved._id, store?._id, user?._id)

        } catch (err) {
            console.log(err);
            throw new InternalServerError("Cannot Save Order");
        }
        route.push(rout)
        console.log({ data: saved, route: route });
        //@ts-ignore
        return ({saved, route, driver});
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
