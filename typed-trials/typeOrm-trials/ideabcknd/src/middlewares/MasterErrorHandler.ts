import { ErrorRequestHandler } from "express";


const MasterErrorHandler:ErrorRequestHandler = (err:Error, req, res, next)=>{
    console.log(err.stack);
    return res.status(500).json({error: "Oops! Sorry, Internal error Happened."});
}

export default MasterErrorHandler;