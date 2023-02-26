import CustomError from "../helpers/error/customError.js"

const customErrorHandler = function(err,req,res,next){

    if(err){
       let custErr  =  err;
       custErr = new CustomError(err.message,err.code || 500);

       return res.status(500).send({
            success:false,
            code:custErr.code,
            msg: custErr.message
        }); 
    }
    next();
}

export {customErrorHandler};