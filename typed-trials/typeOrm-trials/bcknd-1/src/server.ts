import dotenv from 'dotenv';
import express, {Express, json, urlencoded} from 'express';
import { AppDataSource } from './data-source';
import { dbSeeder } from './database-seeder';
import blogRouter from './routes/blogRoutes';
import testRouter from './routes/testRoute';


dotenv.config()
process.env.TZ = "Asia/Kolkata"
const PORT  = process.env.PORT || 3500;

AppDataSource.initialize().then(async ()=>{
    console.log("Connection to Database is successfull!")
    // dbSeeder()
    // console.log(process.env.TZ)
    const app:Express = express();
    //* Middlewares 
    app.use(json())
    app.use(urlencoded({extended: true}))
    
    //* Routes 
    app.get("/", (req, res)=>{
        res.json({msg: "Hello this is a simple express app. Powered by TypeOrm"})
    })
    app.use("/test", testRouter)
    app.use("/blogs", blogRouter);
    
    app.listen(PORT, ()=>{
        console.log(`App is running on Port: ${PORT}`)
    })

}).catch(err=>{
    console.log(err)
})