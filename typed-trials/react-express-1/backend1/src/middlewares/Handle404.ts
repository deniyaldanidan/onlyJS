import { RequestHandler } from "express";

const handle404:RequestHandler = (req, res)=>{
    res.status(404);

    if(req.accepts('json')){
        res.json({err: "404 Not found"});
    } else{
        res.type("text").send("Sorry Not Found in the Server")
    }
}

export default handle404;
