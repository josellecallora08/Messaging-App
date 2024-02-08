import { Request, Response } from "express";
import MessageModel from "../models/message";
import UserModel from "../models/user";
import ChatModel from "../models/chat";
import { ExtendedRequest } from "../middleware/authMiddleware";
import { httpStatusCodes } from "../utils/statuscodes";



class MessageController {
    static async createChat(req: ExtendedRequest, res: Response){
        try{
            const userId = req.user._id
            const {receiverId} = req.params
            if(await ChatModel.findOne({
                'users.sender': userId || receiverId ,
                'users.receiver': receiverId || userId
            })){
                return res
                .status(httpStatusCodes.OK)
                .json({msg: "Chat box exists."})
            } else {
                const chat = await ChatModel.create({'users.sender':userId, 'users.receiver':receiverId})
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

    static async sendMessage(req:ExtendedRequest, res:Response){
        try{    
            const senderId = req.user._id
            const {receiverId, chatId} = req.params
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

    static async fetchMessages(req:ExtendedRequest, res:Response){
        try{
            const userId = req.user._id
            const message = await ChatModel.find({
                $or:[{
                    'users.sender': userId
                },{
                    'users.receiver': userId
                }]
            }).sort({updatedAt: -1}).populate({
                path: 'users.sender users.receiver messages', // Specify multiple paths separated by a space
                model: UserModel,
                select: 'name -_id', // Add additional fields and exclude _id field
            }).populate({
                path: 'messages',
                select: 'content updatedAt -_id', // Include content and createdAt fields, exclude _id
            }).sort({updatedAt: -1})
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