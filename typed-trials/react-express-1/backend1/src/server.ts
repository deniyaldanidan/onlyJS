import dotenv from 'dotenv'
import express, {Express, urlencoded, json} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import HomeRouter from './routes/home';
import handle404 from './middlewares/Handle404';
import errorHandler from './middlewares/errorHandler';
import corsOptions from './config/corsOptions';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import connect_DB from './config/connect_DB';
import mongoose from 'mongoose';
import taskRouter from './routes/task';

dotenv.config()

const app:Express = express();
const PORT:string = process.env.PORT || "3500";

//* Connecting to Database
connect_DB();

//* http-logger
morgan.token('myDate', ()=>new Date().toLocaleString('en-GB', {timeZone: "IST"}))
app.use(morgan(':myDate :url :method :remote-addr :status'))
app.use(morgan(':myDate :url :method :remote-addr :status', {stream: fs.createWriteStream(path.join(__dirname, "..", 'logs', 'http.log'), {flags: "a"})}));

//* Middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(urlencoded({extended:true}));
app.use(json());

//*Routers
app.use("/", HomeRouter)
app.use("/tasks", taskRouter);

//*404 Handler
app.use("*", handle404);
//* Error Handler
app.use(errorHandler) 


mongoose.connection.once("open", ()=>{
    console.log("Connected to Database")
    app.listen(PORT, ()=>{
        console.log(`Server listening on Port: ${PORT}`)
    })
})