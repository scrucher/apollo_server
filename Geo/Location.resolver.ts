import { Context } from "apollo-server-core";
import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { Location } from "./geolocation.model";
import { LocationInput } from "./location.input";
import { LocationService } from "./Location.Service";



@Service()
@Resolver(of => Location)

export class StoreResolver {

    constructor(
        @Inject('Location-Service') private locationService: LocationService,
    ) { }

    // @Query(returns => [Location], { nullable: true })



    @Mutation(returns => Location, {nullable: true})
    async UpdateLocation(@Args() locationInput: LocationInput, @Ctx() context: Context) {
        return await this.locationService.updateLocation(locationInput, context)
    }

}