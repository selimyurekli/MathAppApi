import express from "express";
const questionRouter = express.Router();
import {addQuestion,updateQuestionImagePath} from "../controller/question.js"
import multer from "multer";
import path from "path";

var storageQuestions = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/questions/')
    },
    filename: function (req, file, cb) {
      
      cb(null, req.qid + path.extname(file.originalname)) //Appending extension
    }
  })
  
var upload = multer();

questionRouter.post("/addQuestion",upload.single('image'),addQuestion,updateQuestionImagePath);

export default questionRouter;
