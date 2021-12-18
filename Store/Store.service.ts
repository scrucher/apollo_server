import { Service } from "typedi";
import { StoreInput } from "./Store.input";
import { Store, StoreModel } from "./Store.model";
import * as crypto from "crypto";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { StoreLoginInput } from "./StoreLogin.input";
import { StorePayload } from "./Store.payload";
import { Context } from "apollo-server-core";
import { LocationInput } from "../Utilities/location.input";

@Service('Store_Service')
export class StoreService {
    async CreateStore(storeInput: StoreInput){
        const { store_name,
            email,
            phone,
            city,
            adress,
            image,
            region,
            country,
            password } = storeInput;
        const found = await StoreModel.findOne(
            {
                where: email
            }
        );
        if (found?.email === email && found?.city === city) {
            console.log(found)
            throw new InternalServerError("Account Already Exist")
        } else {
            const store = new StoreModel;
            store.store_name = store_name;
            store.salt = crypto.randomBytes(16).toString('hex')
            //@ts-ignore
            store.password = crypto.pbkdf2Sync(password, store.salt, 1000, 64, "sha512").toString('hex');
            store.email = email;
            store.phone = phone;
            store.city = city;
            //@ts-ignore
            store.image = image;
            store.adress = adress;
            store.region = region;
            store.country = country;
            const saved = await StoreModel.create(store)
                .then(data => data)
                .catch(err => {
                    console.log(err);
                    throw new InternalServerError("Account Already Exist")
                })
                console.log({"id" : saved._id})
            const payload: StorePayload = {
                //@ts-ignore
                username: saved.store_name,
                //@ts-ignore
                email: saved.email
                }
            const token = GenerateToken(payload)
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
        console.log(store)
        if (!store) throw new NotFoundError("Store Not Found")
        const salt = store.salt
        console.log(store._id)
        //@ts-ignore
        const pswd = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
        if (store && pswd === store.password) {
            const payload: StorePayload = {
                //@ts-ignore
                username: store.store_name,
                //@ts-ignore
                email: store.email
            }
            const token = GenerateToken(payload);
            return ({store, token: token });
        } else {
            throw new HttpError(400,  "Email Or Password Not Correct Check and Try Again")
        }
        return;
        
    }

    async getAllStores(){
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

    async updateStoreLocation(locationInput: LocationInput, context: Context) {
        //@ts-ignore
        const { _id } = context.user._id;
        let updated
        try {
            updated = StoreModel.updateOne({ user: _id }, locationInput, {
                    upsert: true
                }
                )
        } catch (err) {
            console.log(err)
        }
        console.log(updated)
        return updated?.coordinates.toString('hex');
    }
}