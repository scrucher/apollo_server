import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { StoreArgs } from "./store.args";
import { StoreInput } from "./Store.input";
import { Store, StoreModel } from "./store.model"
import { StoreService } from "./Store.service";
import { StoreLoginInput } from "./StoreLogin.input";



@Service()
@Resolver(of => Store)
    
export class StoreResolver {

    constructor(@Inject('Store_Service')private storeService : StoreService) { }
    
    @Query(returns => [Store])
    async getStore(@Args() {skip, take}: StoreArgs) {
        const data = await this.storeService.getAllStores({skip, take})
        return data;
    }


    @Mutation(returns => Store)
        //@ts-ignore
    async CreateStore(@Args("storeInput") storeInput: StoreInput){
        return await this.storeService.CreateStore(storeInput)
    }
    @Mutation(returns => Store)
    async StoreLogin(@Args() storeLoginInput: StoreLoginInput) {
        return await this.storeService.StoreLogin(storeLoginInput);
    }
}