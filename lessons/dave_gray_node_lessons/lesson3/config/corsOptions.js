const whitelist = [
    'https://my-site.com',
    'https://my-other-site.com',
    'http://localhost:3500'
];
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