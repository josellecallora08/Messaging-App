import { Request, Response } from "express";
import MessageModel from "../models/message";
import UserModel from "../models/user";
import { httpStatusCodes } from "../utils/statuscodes";

class MessageController {
    static async sendMessage(req:Request, res:Response){
        try{    
            const {senderId, receiverId} = req.params
            const {content} = req.body
            const message = await MessageModel.create({senderId, receiverId, content})
            if(!message)
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({error: "Unable to send message."})
        } catch(err){
            console.log(`Internal Server Error: Send Message`)
            return res
                .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: "Internal Server Error"})
        }
    }

    static async fetchMessages(req:Request, res:Response){
        try{
            const {senderId, receiverId} = req.params
            const message = await MessageModel.findById({senderId})
            if(!message)
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({error: "Unable to send message."})

            
        } catch(err){

        }
    }
}

export default MessageController