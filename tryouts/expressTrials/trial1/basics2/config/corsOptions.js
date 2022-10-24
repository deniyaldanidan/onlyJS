//* allowed parties 
const whitlelist = ['https://www.myDomain.com', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback)=>{
        if (whitlelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;