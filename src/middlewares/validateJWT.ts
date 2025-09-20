import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel";

interface extendRequest extends Request {
    user?: any;
}

const validateJWT = (req:extendRequest, res:Response, next:NextFunction) => {
    const authorizationHeader = req.get('authorization');

    if(!authorizationHeader) {
         res.status(403).send("not provided authorization")
        return;
        }
        const token = authorizationHeader.split(" ")[1];
        
        if(!token) {
            res.status(403).send("not found token")
            return;
        }

        jwt.verify(token, 'noorfarra', async (err, payload) => {
            if(err) {
                res.status(403).send("invalid token")
                return;
            }

            if(!payload) {
                res.status(403).send("payload not found")
                return;
            }

            const userPayLoad= payload as {
                email: string
            }
            

            const user = await userModel.findOne({email: userPayLoad.email})
            req.user = user;
            next();
        } )
}

export default validateJWT;