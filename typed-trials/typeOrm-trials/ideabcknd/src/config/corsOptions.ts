import {CorsOptions} from 'cors';
import allowedOrigins from './allowedOrigins';

const corsOptions:CorsOptions = {
    origin: function(origin, callback){
        if (allowedOrigins.includes(origin) || !origin){
            callback(null, true)
        } else{
            callback(new Error("Not Allowed By CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions;