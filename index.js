

import express from "express";
import mongoose from "mongoose"
const app = express();

import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname,"/public");

import dotenv from 'dotenv';
dotenv.config({ path: "./config/env/config.env" });




app.use(express.json());
app.use(express.static(publicDirectory));

console.log(publicDirectory);




//Authantication check

import {checkAuthOfDevelopers} from "./middlewares/apiKey.js"
app.use(checkAuthOfDevelopers);



//Routers
import authRouter from "./routes/authRouter.js";
import questionRouter from "./routes/questionRouter.js";
import examRouter from "./routes/examRouter.js";


app.use("/auth",authRouter);
app.use("/question",questionRouter);
app.use("/exam",examRouter);





//Handle the errors
import {customErrorHandler} from "./middlewares/customErrorHandler.js"
app.use(customErrorHandler);



const { PORT,MONGO_URI } = process.env;
mongoose.connect(MONGO_URI).then(()=>{
    app.listen(PORT, () => {
        console.log("The application is started on port: ", PORT);
    });
})
.catch((error)=>{
    console.log(error);
})





