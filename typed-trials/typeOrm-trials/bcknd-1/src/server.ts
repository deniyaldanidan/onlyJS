import dotenv from 'dotenv';
import express, {Express, json, urlencoded} from 'express';


dotenv.config()

const app:Express = express();

app.use(json())
app.use(urlencoded({extended: true}))

const PORT  = process.env.PORT || 3500;

app.get("/", (req, res)=>{
    res.json({msg: "Hello this is a simple express app. Powered by TypeOrm"})
})

app.listen(PORT, ()=>{
    console.log(`App is running on Port: ${PORT}`)
})