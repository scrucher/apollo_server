import { Service } from "typedi";
import { DriverInput } from "./Driver.input";
import { Driver, DriverModel } from "./Driver.model";
import * as crypto from "crypto";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { DriverLoginInput } from "./DriverLogin.input";
import { DriverPayload } from "./Driver.payload";

@Service('Driver_Service')
export class DriverService {
    async CreateDriver (driverInput: DriverInput){
        const { username,
            email,
            phone,
            city,
            adress,
            image,
            region,
            country,
            password } = driverInput;
        const found = await DriverModel.findOne({ email })
        if (found?.email === email && found?.city === city) {
            console.log(found)
            throw new InternalServerError("Account Already Exist")
        } else {
            const driver = new DriverModel;
            driver.username = username;
            driver.salt = crypto.randomBytes(16).toString('hex')
            //@ts-ignore
            driver.password = crypto.pbkdf2Sync(password, driver.salt, 1000, 64, "sha512").toString('hex');
            driver.email = email;
            driver.phone = phone;
            driver.city = city;
            //@ts-ignore
            driver.image = image;
            driver.adress = adress;
            driver.region = region;
            driver.country = country;
            const saved = await DriverModel.create(driver)
                .then(data => data)
                .catch(err => {
                    console.log(err);
                    throw new InternalServerError("Account Already Exist")
                })
                console.log({"id" : saved._id})
            const payload: DriverPayload = {
                //@ts-ignore
                username: saved.username,
                //@ts-ignore
                email: saved.email
                }
            const token = GenerateToken(payload)
            return ({data:saved, token: token});
        }
    }

    async DriverLogin(driverLoginInput: DriverLoginInput) {
        const { email, password } = driverLoginInput;
        const driver = await DriverModel.findOne({ email })
            .then(data => data)
            .catch(err => {
                console.log(err);
                throw new InternalServerError("Inetrnal Server Error")
            })
        console.log(driver)
        if (!driver) throw new NotFoundError("Driver Not Found")
        const salt = driver.salt
        console.log(driver._id)
        //@ts-ignore
        const pswd = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
        if (driver && pswd === driver.password) {
            const payload: DriverPayload = {
                //@ts-ignore
                username: driver.username,
                //@ts-ignore
                email: driver.email
            }
            const token = GenerateToken(payload);
            return ({driver, token: token });
        } else {
            throw new HttpError(400,  "Email Or Password Not Correct Check and Try Again")
        }
        return;
        
    }

    async getAllDrivers(){
        const found = await DriverModel.find()
            .then((data:any )=> {
                return data 
            })
            .catch((err: Error)=> {
                console.log(err);
                return ("Internal Server error");
        })
            
        return found;
    }

    async getDriverById():Promise <Driver> {
        const id =""
        const found = await DriverModel.findById(id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;
        
    }

    async deleteDriver():Promise<void> {
        // const id =""
        // const deleted = await DriverModel.deleteOne()
        //     .then((data: any) => {
        //         return data
        //     })
        //     .catch((err: Error) => {

        // return deleted;

    }
    async updateDriver() {
        // const data = {};
        // const id = ""
        // const updated = await DriverModel.update(filter: "")
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