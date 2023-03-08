import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: [true,"Please provide a name"]
    },
    surname:{ 
        type: String,
        required: [true,"Please provide a name"]
    },
    email:{
        type: String,
        required: [true,"Please provide an email address"],
        unique: [true,"Try different email"],
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Email is not in the proper format"],
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],
        minlength: [6,"at least 6 chars"],
        select: false
    },
    classNum:{
        type:String,
        required: [true,"Class is required"],
    },
    role:{
        type:String,
        default:"student",
        enums:["student","teacher","admin"]
    }
});
//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
userSchema.methods.generateJWT = function(){
    const payload = {
        _id : this._id,
        name: this.name,
        surname:this.surname,
        classNum:this.classNum,
        email : this.email
    };
    const token = jwt.sign(payload,process.env.JWT_KEY,{
        algorithm: "HS256",
        expiresIn: parseInt(process.env.JWT_EXPIRES)*60,
    });
    return token;
}

const User = mongoose.model("users", userSchema);

export default User;