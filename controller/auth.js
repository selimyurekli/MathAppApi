import AsyncHandler from 'express-async-handler'
import CustomError from '../helpers/error/customError.js';
import User from '../models/user.js';
import bcrypt from "bcrypt"
const register = async function (req, res, next) {
    try {


        const { name, email, password } = req.body;
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return next(new CustomError("User has already been exist.", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
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
        return next(new CustomError("Internal Error",500));
    }

};


const login = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email: email }).select("+password");;
        console.log(checkUser);
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
        console.log(error);
        return next(new CustomError("Internal Error", 500));
    }

};



export { register, login }