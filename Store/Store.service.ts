import { Error } from "mongoose";
import { Args } from "type-graphql";
import { Inject, Service } from "typedi";
import { StoreArgs } from "./store.args";
import { Store, StoreModel} from "./store.model";

@Service()
export class StoreService {
    @Inject("Store")

    async getAllStores({skip, take}: StoreArgs){
        const found = await StoreModel.find()
            .then((data:any )=> {
                return data 
            })
            .catch((err: Error)=> {
                console.log(err);
                return ("Internal Server error");
        })
            
        return found;
    }

    async getStoreById():Promise <Store> {
        const id =""
        const found = await StoreModel.findById(id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;
        
    }

    async deleteStore():Promise<void> {
        // const id =""
        // const deleted = await StoreModel.deleteOne()
        //     .then((data: any) => {
        //         return data
        //     })
        //     .catch((err: Error) => {
        //         console.log(err);
        //         return ("Internal Server error");
        //     })

        // return deleted;

    }
    async updateStore() {
        // const data = {};
        // const id = ""
        // const updated = await StoreModel.update(filter: "")
        //     .then((data: any) => {
        //         return data
        //     })
        //     .catch((err: Error) => {
        //         console.log(err);
        //         return ("Internal Server error");
        //     })

        // return updated;
        
    }
}