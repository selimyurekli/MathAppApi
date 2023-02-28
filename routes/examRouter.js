import express from "express";
const examRouter = express.Router();
import {getTest} from "../controller/exam.js"



examRouter.get("/test/:index",getTest);


export default examRouter;
