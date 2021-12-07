import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { GoogleAuth } from "../Api/google.auth";
import { GoogleInput } from "../Api/Google.input";
import { Google } from "../Api/Google.type";
import { DriverInput } from "./Driver.input";
import { Driver } from "./Driver.model"
import { DriverService } from "./Driver.service";
import { DriverLoginInput } from "./DriverLogin.input";



@Service()
@Resolver(of => Driver )
    
export class DriverResolver {

    constructor(
        @Inject('Driver_Service') private driverService: DriverService,
        @Inject('Google_Auth') private googleAuth: GoogleAuth,
    ) { }
    
    @Query(returns => [Driver ], {nullable: true})
    async getDriver() {
        const data = await this.driverService.getAllDrivers()
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


    @Mutation(returns => Driver , {nullable: true})
        //@ts-ignore
    async CreateDriver(@Args("storeInput") storeInput: DriverInput){
        return await this.driverService.CreateDriver(storeInput)
    }

    @Mutation(returns => Driver , {nullable: true})
    async DriverLogin(@Args() driverLoginInput: DriverLoginInput) {
        return await this.driverService.DriverLogin(driverLoginInput);
    }

}