import CustomError from "../helpers/error/customError.js"
import bcrypt from "bcrypt";
const API_KEY = "$2b$10$QoBXLczeG70rnQ15yEUoAuLGCFp6IVpPEwJwX0aO44pS/JcBB4XoC"

const checkAuthOfDevelopers = async function(req,res,next){
    var requestedApikey = req.get("x-api-key");
    var isMatched = false
    if(requestedApikey != null)
        isMatched = API_KEY==requestedApikey;
        
    if(!isMatched){

       return res.status(401).send({
            success:false,
            code:401,
            msg: "You are not authorized"
        }); 
    }
    next();
}

export {checkAuthOfDevelopers};