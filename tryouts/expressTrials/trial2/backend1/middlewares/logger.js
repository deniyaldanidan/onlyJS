const logger = (req, res, next)=>{
    console.log(`${req.originalUrl} ${req.method} \t ${req.headers.origin}`);
    next()
}

module.exports = logger;
