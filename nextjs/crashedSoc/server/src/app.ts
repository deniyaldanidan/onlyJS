import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import handle404 from './middlewares/handle404';
import masterErrorHandler from './middlewares/masterErrorHandler';

export default function app() {
    const PORT: number = parseInt(process.env.PORT as string) || 3500;
    const app = express();

    app.use(cors());
    app.use(cookieParser());
    app.use(json());
    app.use(urlencoded({ extended: true }))

    // 404 
    app.use("*", handle404);
    // error-handler
    app.use(masterErrorHandler);


    app.listen(PORT, () => {
        console.log(`App is running on PORT: ${PORT}`);
    });
}