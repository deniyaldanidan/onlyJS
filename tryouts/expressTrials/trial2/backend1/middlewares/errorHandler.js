const errorHandler = (err, req, res, next)=>{
    // if (res.headersSent){
    //     console.log("sent");
    //     return next(err);
    // }
    console.error(err.stack);
    // console.error(err.type);
    // console.error(JSON.stringify(err));
    return res.status(500).json({error: "Oops, Sorry Internal Error Happened!"});
}

module.exports = errorHandler;