import { Args, Mutation, Query, Resolver} from "type-graphql";
import { Inject, Service } from "typedi";
import { OrderInput } from "./Order.input";
import { Order } from "./Order.model";
import { OrderService } from "./Order.service";



@Service()
@Resolver(of => Order)

export class OrderResolver {

    constructor(
        @Inject('Order_Service') private productService: OrderService,
    ) { }

    @Query(returns => [Order])
    async getOrders(): Promise<Order[]> {
        const data = await this.productService.GetAllOrders()
        return data;
    }
    @Query(returns => Order)
    async getOrderById(id : string):Promise<Order>{
      return await this.productService.GetOrderById(id);
    }



    @Mutation(returns => Order)
    //@ts-ignore
    async CreateOrder(@Args("storeInput") storeInput: OrderInput) {
        return await this.productService.CreateOrder(storeInput)
    }

    // @Mutation(returns => Order)
    // async StoreLogin() {
    //     return await this.productService.StoreLogin(storeLoginInput);
    //}

}
