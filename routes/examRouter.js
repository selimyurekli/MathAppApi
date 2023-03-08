import express from "express";
const examRouter = express.Router();
import {getTest,analyzeTest} from "../controller/exam.js"



examRouter.get("/test/:index",getTest);
examRouter.post("/analyze",analyzeTest);


export default examRouter;
