import { Mutation, Query, Resolver } from "type-graphql";
import { Store } from "../Models/store.model"
import { StoreService } from "../Services/Store.service";


@Resolver(Store)
    
export class StoreResolver {
    constructor(private storeService: StoreService) { }
    
    @Query(returns => [Store])
    async getStore() {
         return await this.storeService.getAllStores()
        
    }

    // @Mutation()
    // async createStore() {
        
    // }

    

}