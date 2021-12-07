import { StoreModel } from "../Store/Store.model";
import { LocationInput } from "./location.input";
import { UserModel } from "../Users/Users.model";
import { Service } from "typedi";
import { Context } from "apollo-server-core";
import { mongoose } from "@typegoose/typegoose";




@Service('Location-Service')
export class LocationService {

    async updateLocation(locationInput: LocationInput, context: Context) {
        //@ts-ignore
        const { _id }= context.user._id;
        let updated
        try{
            updated = StoreModel.findOneAndUpdate(_id, {
            $push: {
                locations: {
                    coordinates: locationInput,
                }
            }
            }) ||
                UserModel.findOneAndUpdate(_id, {
                    $push: {
                        location: {
                            coordinates: locationInput,
                        }
                    }
                }

                )
        } catch (err) {
            console.log(err)
        }
        console.log(updated)
        return updated
    }

    async GetLocation() {
        
    }
}