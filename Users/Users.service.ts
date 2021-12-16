import { Service } from "typedi";
import { UserInput } from "./Users.input";
import { User, UserModel } from "./Users.model";
import * as crypto from "crypto";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { UserLoginInput } from "./UsersLogin.input";
import { Context } from "apollo-server-core";
import { LocationInput } from "../Utilities/location.input";


@Service('User_Service')
export class UserService
{
    async CreateStore(storeInput: UserInput)
    {
        const
            { username,
            email,
            phone,
            city,
            adress,
            image,
            region,
            country,
            password
        } = storeInput;
        const found = await UserModel.findOne(
            {
            where: email
            }
        )
        if (found?.email === email && found?.city === city)
        {
            console.log(found)
            throw new InternalServerError("Account Already Exist")
        } else
        {
            const user = new UserModel;
            user.username = username;
            user.salt = crypto.randomBytes(16).toString('hex')
            //@ts-ignore
            user.password = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString('hex');
            user.email = email;
            user.phone = phone;
            user.city = city;
            //@ts-ignoreore
            user.image = image;
            user.adress = adress;
            user.region = region;
            user.country = country;
            const saved = await UserModel.create(user)
                .then(data => data)
                .catch(err => {
                    console.log(err);
                    throw new InternalServerError("Account Already Exist")
                }
            );
            const user_email = user.email;
            const user_username = user.username;
            const token: string = GenerateToken({ user_username, user_email });
            return ({token: token});
        }
    }

    async StoreLogin(storeLoginInput: UserLoginInput) {
        const { email, password } = storeLoginInput;
        const user = await UserModel.findOne({email})
            .then(data => data)
            .catch(err => {
                console.log(err);
                throw new InternalServerError("Inetrnal Server Error")
            })
        console.log(user?._id)
        if (!user) throw new NotFoundError("Store Not Found")
        const salt = user.salt
        //@ts-ignore
        const pswd = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
        if (user && pswd === user.password) {
            const token = GenerateToken({email: user.email, usernmae: user.username});
            return ({user, token: token });
        } else {
            throw new HttpError(400,  "Email Or Password Not Correct Check and Try Again")
        }
        return;
        
    }

    async getAllStores(){
        const found = await UserModel.find()
            .then((data:any )=> {
                return data 
            })
            .catch((err: Error)=> {
                console.log(err);
                return ("Internal Server error");
        })
            
        return found;
    }

    async getStoreById():Promise <User> {
        const id =""
        const found = await UserModel.findById(id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;
        
    }

    async deleteUser(id: string): Promise<any> {
        let deleted;
        try{
            deleted = await UserModel.deleteOne({ _id: id })
        } catch (err) {
            throw new InternalServerError('Internal Server Error')
        }
        if (deleted.deletedCount === 1) return "User Deleted Successfully";
    }

    async updateUser(id: string, userInput : UserInput){
        const data = userInput;
        let updated;
        {
            updated = await UserModel.updateOne({ _id: id }, data, {
            upsert: true,
            })
        }
        return updated;
    }

    async updateUserLocation(locationInput: LocationInput, context: Context) {
        //@ts-ignore
        const { _id } = context.user._id;
        let updated
        try {
            updated = 
                UserModel.updateOne(
                    {
                        user: _id
                    }, locationInput, {
                    upsert: true
                }
                )
        } catch (err) {
            console.log(err)
        }
        console.log(updated)
        return updated;
    }

}