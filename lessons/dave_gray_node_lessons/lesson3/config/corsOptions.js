const whitelist = require("./whitelist");
const corsOptions = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null, true);
        } else{
            errLogger(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;