import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    questions:[{
        type:mongoose.Types.ObjectId,
        ref:"questions"
    }],
    duration:{
        type:Number
    }
});


const Exam = mongoose.model("exams", examSchema);

export default User;