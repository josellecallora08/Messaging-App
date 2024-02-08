import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { httpStatusCodes } from "../utils/statuscodes";

export interface ExtendedRequest extends Request {
    user?: any;
  }
  
export const authMiddleware = async(req: ExtendedRequest, res: Response, next: NextFunction) => {
    try{
        const {authorization} = req.headers
        if(!authorization) 
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({error: "Token not found..."})

        const token = authorization.replace(`Bearer `, '');
        const decodedToken = jwt.verify(token, process.env.SECRET as string)

        req.user = decodedToken
        next()
    } catch(err){
        console.log(`Unable to proceed from middleware`)
        return res
            .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: "Internal Server Error"})
    }
}