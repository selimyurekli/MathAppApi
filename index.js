

import express from "express";
import mongoose from "mongoose"
const app = express();



import dotenv from 'dotenv';
dotenv.config({ path: "./config/env/config.env" });






app.use(express.json());


//Routers
import authRouter from "./routes/authRouter.js";


app.use("/auth",authRouter);





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





