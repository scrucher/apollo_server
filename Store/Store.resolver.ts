import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { GoogleAuth } from "../Config/google.auth";
import { GoogleInput } from "../Config/Google.input";
import { Google } from "../Config/Google.type";
import { StoreInput } from "./Store.input";
import { Store } from "./Store.model"
import { StoreService } from "./Store.service";
import { StoreLoginInput } from "./StoreLogin.input";



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

}