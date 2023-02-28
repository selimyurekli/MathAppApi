import Question from '../models/question.js';
import CustomError from '../helpers/error/customError.js';
import path from "path"
import fs from "fs"


const addQuestion = async function (req, res, next) {
    try {
        var fstream;
        req.pipe(req.busboy);

        req.busboy.on('file', function (fieldname, file, filename) {
            try {
                console.log(fieldname);
                console.log("Uploading: " + filename);
                fstream = fs.createWriteStream(__dirname + '/public/questions/' + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    res.redirect('back');
                });
            } catch (error) {
                console.log(error);
            }

        });

        const { userId, subject, correctAnswer } = req.body;
        var question = await Question.create({
            correctAnswer: correctAnswer,
            subject: subject,
            questionImagePath: "",
            uploadedBy: userId
        });
        req.qid = question._id;
        next();
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
};
const updateQuestionImagePath = async function (req, res, next) {
    try {
        const question = await Question.findByIdAndUpdate(req.qid, { questionImagePath: "./public/questions/" + req.qid + path.extname(req.file.originalname) });
        res.status(200).json({ success: true, questionId: req.qid });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }

}



export { addQuestion, updateQuestionImagePath }