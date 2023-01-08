import express, { json, urlencoded } from 'express';
import AppDataSource from './data-source';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions';
import Handle404 from './middlewares/404Handler';
import MasterErrorHandler from './middlewares/MasterErrorHandler';
import authRouter from './routes/auth';
import baseRouter from './routes/baseRouter';
import ideaRouter from './routes/api/ideaRoutes';
import likeCommentRouter from './routes/api/likeCommentRoutes';
import profileRouter from './routes/api/profileRouter';
import fetchAllRouter from './routes/api/fetchAllRoutes';

const PORT = process.env.PORT || 3500;

AppDataSource.initialize().then(()=>{
    console.log("SuccessFully connected to the database")
}).then(()=>{
    const app = express();
    //** Middlewares */
    app.use(morgan("dev"));
    app.use(cors(corsOptions));
    app.use(json());
    app.use(cookieParser())
    app.use(urlencoded({extended:true}));
    //** Routes */
    app.use("/", baseRouter);
    app.use("/all", fetchAllRouter);
    app.use("/auth", authRouter);
    app.use("/ideas", ideaRouter);
    app.use("/", likeCommentRouter);
    app.use("/profile", profileRouter)

    //** 404 & Error Handlers */
    app.use("*", Handle404);
    app.use(MasterErrorHandler);
    

    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT: ${PORT}`)
    })
}).catch(err=>{
    console.log(err)
    throw err;
})