import { RequestHandler } from "express";

const Handle404:RequestHandler = (_, res)=>{
    return res.status(404).json({error: "404 Not Found"})
}

export default Handle404;