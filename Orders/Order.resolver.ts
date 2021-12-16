import { Context } from "apollo-server-core";
import { any } from "joiful";
import { Args, Mutation, Query, Resolver, Ctx} from "type-graphql";
import { ContextParamMetadata } from "type-graphql/dist/metadata/definitions";
import { Inject, Service } from "typedi";
import { OrderArgs } from "./Order.args";
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



    @Mutation(returns => Order, {nullable: true})
    //@ts-ignore
    async CreateOrder(@Args("storeInput") storeInput: OrderInput,@Ctx() context: Context) {
        return await this.productService.CreateOrder(storeInput, context)
    }

    @Mutation(returns => Order, { nullable: true })
    async UpdateProduct(@Args({ validate: false }) orderInput: OrderInput,
        @Args() orderArgs: OrderArgs) {
        return await this.productService.UpdateOrder(orderInput, orderArgs);
    }

    @Mutation(returns => Order, { nullable: true })
    async DeleteProduct(@Args({ validate: false }) orderArgs: OrderArgs,
        @Ctx() context: Context) {
        console.log(context)
        return await this.productService.DeleteOrder(orderArgs, context);
    }


}
