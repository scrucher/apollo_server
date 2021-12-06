import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { GoogleAuth } from "../Api/google.auth";
import { GoogleInput } from "../Api/Google.input";
import { Google } from "../Api/Google.type";
import { UserInput } from "./Users.input";
import { User} from "./Users.model"
import { UserService } from "./Users.service";
import { UserLoginInput } from "./UsersLogin.input";



@Service()
@Resolver(of => User)
    
export class UserResolver {

    constructor(
        @Inject('User_Service') private userService: UserService,
        @Inject('Google_Auth') private googleAuth: GoogleAuth,
    ) { }
    
    @Query(returns => [User], {nullable: true})
    async getUser() {
        const data = await this.userService.getAllStores()
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


    @Mutation(returns => User, {nullable: true})
    async CreateUser(@Args() storeInput: UserInput){
        return await this.userService.CreateStore(storeInput)
    }

    @Mutation(returns => User, {nullable: true})
    async UserLogin(@Args() storeLoginInput: UserLoginInput) {
        return await this.userService.StoreLogin(storeLoginInput);
    }

}