const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next)=>{
    let reqOrigin = req.headers.origin;
    if (allowedOrigins.includes(reqOrigin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;