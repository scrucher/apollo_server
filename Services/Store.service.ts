import { Error } from "mongoose";
import { Args } from "type-graphql";
import { Store} from "../Models/store.model";

export class StoreService {

    async getAllStores(){
        const found = await Store.find()
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
        const found = await Store.findById(id)
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
        const id =""
        const deleted = await Store.deleteOne({
            $where: id
        })
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return deleted;

    }
    async updateStore() {
        const data = {};
        const id = ""
        const updated = await Store.update({
            $where: id
        }, data)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return updated;
        
    }
}