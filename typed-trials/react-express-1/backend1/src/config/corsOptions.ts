import AllowedOrigins from "./allowedOrigins";
import {CorsOptions} from 'cors';

const corsOptions:CorsOptions = {
    origin: function(origin, callback){
        if (typeof origin==='string'){
            if (AllowedOrigins.includes(origin)){
                return callback(null, true)
            } else{
                return callback(new Error("Sorry, Not Allowed by CORS"))
            }
        }
        if (typeof origin === "undefined"){
            return callback(null, true) //* During Dev allow, During Prouction produce an error like above
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions;