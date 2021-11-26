import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { GoogleAuth } from "../Config/google.auth";
import { GoogleInput } from "../Config/Google.input";
import { Google } from "../Config/Google.type";
import { StoreArgs } from "./Users.args";
import { StoreInput } from "./Users.input";
import { Store} from "./Users.model"
import { StoreService } from "./Users.service";
import { StoreLoginInput } from "./UsersLogin.input";



@Service()
@Resolver(of => Store)
    
export class StoreResolver {

    constructor(
        @Inject('Store_Service') private storeService: StoreService,
        @Inject('Google_Auth') private googleAuth: GoogleAuth,
    ) { }
    
    @Query(returns => [Store])
    async getStore(@Args() {skip, take}: StoreArgs) {
        const data = await this.storeService.getAllStores({skip, take})
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