import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: [true,"please provide a name"]
    },
    email:{
        type: String,
        required: [true,"Please provide an email address"],
        unique: [true,"Try Different email"],
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Email is not in the proper format"],
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],
        minlength: [6,"at least 6 chars"],
        select: false
    }
});
//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
userSchema.methods.generateJWT = function(){
    const payload = {
        _id : this._id,
        name: this.name,
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