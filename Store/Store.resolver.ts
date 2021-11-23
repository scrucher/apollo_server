import { Context } from "apollo-server-core";
import { Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { StoreArgs } from "./store.args";
import { StoreInput } from "./Store.input";
import { Store, StoreModel } from "./store.model"
import { StoreService } from "./Store.service";
import { v4 } from "uuid";
import * as crypto from "crypto";
import GenerateToken from "../Utilities/GenerateTK";



@Service()
@Resolver(of => Store)
    
export class StoreResolver {
    constructor(private storeService: StoreService) { }
    
    @Query(returns => [Store])
    async getStore(@Args() {skip, take}: StoreArgs) {
        const data = await this.storeService.getAllStores({skip, take})
        return data;
        // const found = await StoreModel.find()
        //     .then((data: any) => {
        //         return data
        //     })
        //     .catch((err: Error) => {
        //         console.log(err);
        //         return ("Internal Server error");
        //     })

        // return found;
    }


    @Mutation(returns => Store)
        //@ts-ignore
    async createStore(@Args("storeInput") storeInput: StoreInput, @Ctx() contex: Context) {
        const { store_name,
            email,
            phone,
            city,
            region,
            country,
            password } = storeInput;
        const found = await StoreModel.findOne({email}, )
        if (found?.email === email && found?.city === city) {
            return ("Account Already Exist");
        } else {
            const salt = crypto.randomBytes(16).toString('hex')
            const store = new StoreModel;
            store._id = await v4();
            store.store_name = store_name;
            //@ts-ignore
            store.password = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
            store.email = email;
            store.phone = phone;
            store.city = city;
            store.region = region;
            store.country = country;
            const saved = await StoreModel.create(store)
                .then(data => data )
                .catch(err => {
                    console.log(err)
                })
            if (saved) {
                const token = GenerateToken(saved._id)
                return ({saved, token})
            } else {
                return ("Cannot Save Record");
            }
            
        }
    }
}