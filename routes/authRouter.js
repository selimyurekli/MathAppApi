import express from "express";
const authRouter = express.Router();
import {register,login} from "../controller/auth.js"



authRouter.post("/register",register);
authRouter.post("/login",login);

export default authRouter;
