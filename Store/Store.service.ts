import { Service } from "typedi";
import { StoreArgs } from "./store.args";
import { StoreInput } from "./Store.input";
import { Store, StoreModel } from "./store.model";
import * as crypto from "crypto";
import { v4 } from "uuid";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { StoreLoginInput } from "./StoreLogin.input";

@Service('Store_Service')
export class StoreService {
    async CreateStore(storeInput: StoreInput){
        const { store_name,
            email,
            phone,
            city,
            region,
            country,
            password } = storeInput;
        const found = await StoreModel.findOne({ email })
        if (found?.email === email && found?.city === city) {
            console.log(found)
            throw new InternalServerError("Account Already Exist")
        } else {
            const store = new StoreModel;
            store._id = await v4();
            store.store_name = store_name;
            store.salt = crypto.randomBytes(16).toString('hex')
            //@ts-ignore
            store.password = await crypto.pbkdf2Sync(password, store.salt, 1000, 64, "sha512").toString('hex');
            store.email = email;
            store.phone = phone;
            store.city = city;
            store.region = region;
            store.country = country;
            const saved = await StoreModel.create(store)
                .then(data => data)
                .catch(err => {
                    console.log(err);
                    throw new InternalServerError("Account Already Exist")
                })
            const token = GenerateToken(saved._id)
            return ({data:saved, token: token});
            

        }
    }

    async StoreLogin(storeLoginInput: StoreLoginInput) {
        const { email, password } = storeLoginInput;
        const store = await StoreModel.findOne({ email })
            .then(data => data)
            .catch(err => {
                console.log(err);
                throw new InternalServerError("Inetrnal Server Error")
            })
        if (!store) throw new NotFoundError("Store Not FOund")
        const salt = store.salt
        //@ts-ignore
        const pswd = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
        if (store && pswd === store.password) {
            const token = GenerateToken(store._id);
            return ({store, token: token });
        } else {
            throw new HttpError(400,  "Email Or Password Not Correct Check and Try Again")
        }
        return;
        
    }

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