import { RequestHandler } from "express";
import { isString } from "lodash";
import validator from "validator";
import jwt, { JwtPayload } from 'jsonwebtoken'


const verifyJWT:RequestHandler = (req, res, next)=>{
    const authHead = req.headers.authorization || req.headers['Authorization'];
    if(!authHead || !isString(authHead) || !authHead?.startsWith('Bearer ')) return res.sendStatus(401);

    const accToken = authHead.split(" ")[1];
    if (!validator.isJWT(accToken)) return res.sendStatus(401);

    jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded:JwtPayload)=>{
        if (err) return res.sendStatus(401);
        res.locals.uname = decoded.uname;
        res.locals.fname = decoded.fname;
        res.locals.lname = decoded.lname;
        next();
    })

}

export default verifyJWT;