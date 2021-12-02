import { Service } from "typedi";
import { AdminInput } from "./Admin.input";
import { Admin, AdminModel } from "./Admin.model";
import * as crypto from "crypto";
import { v4 } from "uuid";
import GenerateToken from "../Utilities/GenerateTK";
import { HttpError, InternalServerError, NotFoundError } from "routing-controllers";
import { AdminLoginInput } from "./AdminLogin.input";

@Service('Admin_Service')
export class AdminService {
    async CreateAdmin(adminInput: AdminInput){
        const { user_name,
            email,
            phone,
            password } = adminInput;
        const found = await AdminModel.findOne({ email })
        if (found?.email === email) {
            console.log(found)
            throw new InternalServerError("Account Already Exist")
        } else {
            const admin = new AdminModel;
            admin.user_name = user_name;
            admin.salt = crypto.randomBytes(16).toString('hex')
            //@ts-ignore
            admin.password = crypto.pbkdf2Sync(password, admin.salt, 1000, 64, "sha512").toString('hex');
            admin.email = email;
            admin.phone = phone;
            const saved = await AdminModel.create(admin)
                .then(data => data)
                .catch(err => {
                    console.log(err);
                    throw new InternalServerError("Account Already Exist")
                })
            const token = GenerateToken(saved._id)
            return ({data:saved, token: token});


        }
    }

    async AdminLogin(adminLoginInput: AdminLoginInput) {
        const { email, password } = adminLoginInput;
        const user = await AdminModel.findOne({ email })
            .then(data => data)
            .catch(err => {
                console.log(err);
                throw new InternalServerError("Inetrnal Server Error")
            })
        if (!user) throw new NotFoundError("Store Not FOund")
        const salt = user.salt
        //@ts-ignore
        const pswd = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
        if (user && pswd === user.password) {
            const token = GenerateToken(user._id);
            return ({user, token: token });
        } else {
            throw new HttpError(400,  "Email Or Password Not Correct Check and Try Again")
        }
        return;

    }

    async deleteStore():Promise<void> {
        // const id =""
        // const deleted = await AdminModel.deleteOne()
        //     .then((data: any) => {
        //         return data
        //     })
        //     .catch((err: Error) => {

        // return deleted;

    }
    async updateStore() {
        // const data = {};
        // const id = ""
        // const updated = await AdminModel.update(filter: "")
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
