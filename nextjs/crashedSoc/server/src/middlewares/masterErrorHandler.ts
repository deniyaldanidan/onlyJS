import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


const masterErrorHandler:ErrorRequestHandler = (error:Error, req, res, next)=>{
    console.log(error.stack);
    return res.status(500).json({error: "OOps!, Error Happened, Try again some time later."})
}

export default masterErrorHandler;