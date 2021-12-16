import "reflect-metadata";
import mongoose from "mongoose";
import {  DbUrl } from "./Api/auth.config.";
import * as dotenv from "dotenv";
import app, { App} from './app';
dotenv.config();



async function Main() {

    const port = process.env.PORT
    App();
    await mongoose.connect(DbUrl, {
        autoIndex: true,
    })
        .then(() => {
        // mongoose.set('debug', true)
        app.listen(port, ()=>{
            console.log(`app listen on port ${port}`);
        });
        })
        .catch(err => {
        console.log(err);
    });
}

Main();
