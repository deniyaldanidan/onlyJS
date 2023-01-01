import { ErrorRequestHandler } from "express";


const AuthErrorHandler:ErrorRequestHandler = (err, req, res, next)=>{
    if (err instanceof TypeError){
        return res.status(400).json({error: "Invalid value"})
    }
    
    next(err);
}

export default AuthErrorHandler;