import { RequestHandler } from "express"


const HomeController:RequestHandler = (req, res)=>{
    res.json({msg: "Welcome to Ideas App"})
}

export default HomeController;