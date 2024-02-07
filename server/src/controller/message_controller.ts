import { Request, Response } from "express";
import MessageModel from "../models/message";
import UserModel from "../models/user";
import ChatModel from "../models/chat";
import { httpStatusCodes } from "../utils/statuscodes";

class MessageController {
    static async createChat(req: Request, res: Response){
        try{
            const {senderId, receiverId} = req.params
            if(await ChatModel.findOne({
                'users.sender': senderId || receiverId ,
                'users.receiver': receiverId || senderId
            })){
                return res
                .status(httpStatusCodes.OK)
                .json({msg: "Chat box exists."})
            } else {
                const chat = await ChatModel.create({'users.sender':senderId, 'users.receiver':receiverId})
                if(!chat)
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({error: "Unable to create chat box."})

                return res
                    .status(httpStatusCodes.OK)
                    .json({msg: "Chat box created."})
            }
        } catch(err){
            console.log(`Internal Server Error: Send Message`)
            return res
                .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: "Internal Server Error"})
        }
    }

    static async sendMessage(req:Request, res:Response){
        try{    
            const {senderId, receiverId, chatId} = req.params
            const {content} = req.body
          
            const chat = await ChatModel.findById({_id:chatId})
            if(!chat)
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({error: "Unable to create chat box."})

            const message = await MessageModel.create({senderId, receiverId, content})
            if(!message)
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({error: "Unable to send message."})


            chat.messages.push(message._id)
            await chat.save()
            await message.save()
            return res
                .status(httpStatusCodes.OK)
                .json({msg: "Sent a message", message})
        } catch(err){
            console.log(`Internal Server Error: Send Message`)
            return res
                .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: "Internal Server Error"})
        }
    }

    static async fetchMessages(req:Request, res:Response){
        try{
            const {chatId} = req.params
            const message = await ChatModel.findById(chatId).populate({
                path: 'users.sender users.receiver messages', // Specify multiple paths separated by a space
                model: UserModel,
                select: 'name email -_id', // Add additional fields and exclude _id field
            }).populate({
                path: 'messages',
                select: 'content createdAt -_id', // Include content and createdAt fields, exclude _id
            });
            if(!message)
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({error: "Unable to fetch message."})


            return res
                .status(httpStatusCodes.OK)
                .json({msg: "Fetched messages.", message})
            
        } catch(err){
            console.log("Internal SErver Error")
            return res
                .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: "Internal Server Error"})
        }
    }
}

export default MessageController