import AsyncHandler from 'express-async-handler'
import CustomError from '../helpers/error/customError.js';
import User from '../models/user.js';
import bcrypt from "bcrypt"
const register = async function (req, res, next) {
    try {


        const {name, surname, email, password, classNum} = req.body;
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return next(new CustomError("User has already been exist.", 400));
        }
        if(classNum!="9.Sınıf" && classNum!="10.Sınıf" && classNum!="11.Sınıf"&&classNum!="12.Sınıf"){
            return next(new CustomError("Not Proper Class Format", 500));

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            surname:surname,
            email: email,
            password: hashedPassword,
            classNum: classNum
        });



        if (!user) {
            return next(new CustomError("User couldnt be created.", 500));
        }

        const token = user.generateJWT();

        if (!token) {
            return next(new CustomError("Token error.", 500));
        }


        return res.status(200)
            .json({
                success: true,
                access_token: token
            });
    }catch (error) {
        return next(new CustomError(error.message, 500));
    }

};


const login = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email: email }).select("+password");;
        if (!checkUser) {
            return next(new CustomError("User not found", 404));
        }

        const isMatched = await bcrypt.compare(password, checkUser.password);
        if (!isMatched)
            return next(new CustomError("Wrong password", 400));

        const token = checkUser.generateJWT();
        if (!token) {
            return next(new CustomError("Token error.", 500));
        }


        return res.status(200)
            .json({
                success: true,
                access_token: token
            });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }

};



export { register, login }