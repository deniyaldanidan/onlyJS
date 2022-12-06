import {Request, Response, Router} from 'express';

const HomeRouter:Router  = Router();

HomeRouter.get("/", (req:Request, res:Response)=>{
    res.json({msg: "Hello World"})
})

export default HomeRouter;