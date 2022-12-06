import { ErrorRequestHandler } from 'express';

const errorHandler:ErrorRequestHandler = (err, req, res, next)=>{
    if (res.headersSent){
        return next(err)
    }
    
    // console.log(err.stack);

    res.status(500);
    res.json({err: "Internal Error Happened"});
}

export default errorHandler;