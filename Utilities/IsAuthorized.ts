import { Request, Response, NextFunction } from "express";
import DecodeToken from "./decode_token";
import { UserModel } from "../Users/Users.model";
import { AdminModel } from "../Admins/Admin.model";
import { InternalServerError, HttpError } from "routing-controllers";


export const IsAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const token: string = req.headers.authorization?.split(' ')[1];

    //@ts-ignore
    const id = DecodeToken(token)
    const admin = await AdminModel.findById(id)
        .catch(err => {
        console.log(err);
        throw new InternalServerError("Internal Server Error");
    })
    const user = await UserModel.findById(id)
        .catch(err => {
            console.log(err);
            throw new InternalServerError("Internal Server Error");
        })
    
    // const store = await UserModel.findById(id)
    //     .catch(err => {
    //         console.log(err);
    //         throw new InternalServerError("Internal Server Error");
    //     })
    
    // const driver = await UserModel.findById(id)
    //     .catch(err => {
    //         console.log(err);
    //         throw new InternalServerError("Internal Server Error");
    //     })
    
    // if (admin || user || store || driver) {
    //     // const auths = [admin, user, store, driver]
    //     // for (const auth in auths) {
    //     //     switch (auth) {

    //     //         case admin:
    //     //             //@ts-ignore
    //     //             req.admin = admin;
    //     //             next()
    //     //             break;
            
    //     //         case user:
    //     //             //@ts-ignore
    //     //             req.user = user;
    //     //             next();
    //     //             break;

    //     //         case store:
    //     //             //@ts-ignore
    //     //             req.store = store;
    //     //             next();
    //     //             break;

    //     //         case driver:
    //     //             //@ts-ignore
    //     //             req.deriver = driver;
    //     //             next();
    //     //             break;

    //     // }
    //     // }


        //@ts-ignore

        req.user = user ;
        next();
        
    // } else {
    //     throw new HttpError(401, "Unauthorized");
    // }
    


}


