import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
     correctAnswer:String,
     subject:String,
     questionImagePath:String,
     uploadedBy:{
         type:'ObjectId',
         ref:'users'
     }
});


const Question = mongoose.model("questions", questionSchema);

export default Question;