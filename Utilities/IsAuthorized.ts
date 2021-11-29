import { InternalServerError } from "routing-controllers";
import { AuthChecker, UnauthorizedError } from "type-graphql";
import { AdminModel } from "../Admins/Admin.model";
import { StoreModel } from "../Store/Store.model";
import { UserModel } from "../Users/Users.model";
import DecodeToken from "./decode_token";

export const IsAuthorized = async (req: any) => {
    console.log(req.headers.authorization)
    //@ts-ignore
    const token = req.headers.authorization
    // here we can read the user from context
    const email = DecodeToken(token)
    console.log(id)
    // and check his permission in the db against the `roles` argument
    const store = await StoreModel.findOne({email})
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })
    if (store) return store;

    const user = await UserModel.findOne({ email })
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })
    if (user) return user;

    const admin = await AdminModel.findOne({ email })
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })
    if (admin) return admin;

    // const driver = await UserModel.findOne({email})
    //     .catch(err => {
    //         console.log(err);
    //         throw new InternalServerError("Internal Server Error");
    //     })

    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

   throw new UnauthorizedError()
};