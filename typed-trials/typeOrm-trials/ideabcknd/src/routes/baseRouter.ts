import { Router } from "express";
import HomeController from "../controllers/HomeController";
import verifyJWT from "../middlewares/verifyJWT";


const baseRouter = Router();

baseRouter.get("/", HomeController);
baseRouter.get("/test",verifyJWT, (req, res)=>{
    return res.json({uname: res.locals.uname, fname: res.locals.fname, lname: res.locals.lname})
})


export default baseRouter;