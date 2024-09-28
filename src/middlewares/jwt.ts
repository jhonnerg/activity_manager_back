import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
export const checkJwt = (req: Request, res: Response, next: NextFunction) => { 
    const token = <string>req.headers['auth']; 
    let jwtpayload;
    try {
        jwtpayload = <any>jwt.verify(token, config.jwtSecret)
        res.locals.jwtpayload = jwtpayload;
    } catch (error) {
        return res.status(401).send({message:'Not Authorized'})
    }
    const { userId, username } = jwtpayload;
    
    let newToken = jwt.sign({ userId:userId, username:username }, config.jwtSecret, { expiresIn: '1h' })
    res.setHeader('token', newToken);
    next();
}