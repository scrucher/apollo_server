import { Args, Ctx, Mutation, Query, Resolver, Authorized} from "type-graphql";
import { Inject, Service } from "typedi";
import { ProductInput } from "./Product.input";
import { ProductArgs } from "./Product.args"
import { Product } from "./Product.model";
import { ProductService } from "./Product.service";
import { Context } from "apollo-server-core";
import { User } from "../Users/Users.model";
import { Request } from "express";



@Service()
@Resolver(of => Product)

export class ProductResolver {

    constructor(
        @Inject('Product_Service') private productService: ProductService,
    ) { }

    @Query(returns => [Product], {nullable: true})
    async getProducts(): Promise<Product[]> {
        const data = await this.productService.getAllProducts()
        return data;
    }
    @Query(returns => Product, {nullable: true})
    async getProductById(@Args() _id : ProductArgs):Promise<Product>{
      return await this.productService.getProductById(_id);
    }

    @Mutation(returns => Product, {nullable: true})
    //@ts-ignore
    async CreateProduct(@Args("productInput") productInput: ProductInput, @Ctx() context: Context, req: Request) {
        console.log({ "req": req })
        //@ts-ignore
        console.log(context.req);
        return await this.productService.CreateProduct(productInput, context)
    }

    @Mutation(returns => Product, {nullable: true})
    async UpdateProduct(@Args( {validate: false}) productInput: ProductInput,@Args() productArgs: ProductArgs) {
        return await this.productService.UpdateProduct(productInput, productArgs);
    }

    @Mutation(returns => Product, {nullable: true})
    async DeleteProduct(@Args({ validate: false }) { _id }: ProductArgs, @Ctx() context: Context) {
        console.log(context)
        return await this.productService.DeleteProduct( _id);
    }

}
