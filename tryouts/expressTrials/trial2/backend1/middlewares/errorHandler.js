const { errorStream, errLog } = require("../config/loggers");

const errorHandler = (err, req, res, next)=>{
    // if (res.headersSent){
    //     console.log("sent");
    //     return next(err);
    // }
    errLog(err.stack);
    // console.error(err.type);
    // console.error(JSON.stringify(err));
    return res.status(500).json({error: "Oops, Sorry Internal Error Happened!"});
}

module.exports = errorHandler;