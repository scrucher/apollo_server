import { InternalServerError } from "routing-controllers";
import { AuthChecker } from "type-graphql";
import { AdminModel } from "../Admins/Admin.model";
import { StoreModel } from "../Store/Store.model";
import { UserModel } from "../Users/Users.model";
import DecodeToken from "./decode_token";

export const customAuthChecker: AuthChecker = async (
    { root, args, context, info },
    roles,
) => {
    //@ts-ignore
    const token = context.token
    // here we can read the user from context
    const id = DecodeToken(token)
    // and check his permission in the db against the `roles` argument
    const store = await StoreModel.findById(id)
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })

    const user = await UserModel.findById(id)
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })

    const admin = await AdminModel.findById(id)
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })

    // const driver = await UserModel.findById(id)
    //     .catch(err => {
    //         console.log(err);
    //         throw new InternalServerError("Internal Server Error");
    //     })

    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    if (admin || user || store) {
        return true
    } else {
        return false
    }
   
};