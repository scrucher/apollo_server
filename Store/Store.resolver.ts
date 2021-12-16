import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { GoogleAuth } from "../Api/google.auth";
import { GoogleInput } from "../Api/Google.input";
import { Google } from "../Api/Google.type";
import { StoreInput } from "./Store.input";
import { Store } from "./Store.model"
import { StoreService } from "./Store.service";
import { StoreLoginInput } from "./StoreLogin.input";
import { Context } from "apollo-server-core";
import { LocationInput } from "../Utilities/location.input";



@Service()
@Resolver(of => Store )
    
export class StoreResolver {

    constructor(
        @Inject('Store_Service') private storeService: StoreService,
        @Inject('Google_Auth') private googleAuth: GoogleAuth,
    ) { }
    
    @Query(returns => [Store ], {nullable: true})
    async getStore() {
        const data = await this.storeService.getAllStores()
        return data;
    }

    @Query(returns => Google)
    async getGoogleAuthLink() {
        return await this.googleAuth.urlGoogle();
    }

    @Mutation(returns => Google)
    async googleAuthFromCode(@Args() googleInput: GoogleInput) {
        const { code } = googleInput;
        //ts-ignore
        return await this.googleAuth.getGoogleAccountFromCode(code)
    }


    @Mutation(returns => Store , {nullable: true})
        //@ts-ignore
    async CreateStore(@Args("storeInput") storeInput: StoreInput){
        return await this.storeService.CreateStore(storeInput)
    }

    @Mutation(returns => Store , {nullable: true})
    async StoreLogin(@Args() storeLoginInput: StoreLoginInput) {
        return await this.storeService.StoreLogin(storeLoginInput);
    }

    @Mutation(returns => Store, { nullable: true })
    async UpdateStoreLocation(@Args() locationInput: LocationInput, @Ctx() context: Context) {
        return await this.storeService.updateStoreLocation(locationInput, context)
    }

}