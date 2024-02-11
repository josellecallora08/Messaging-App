import { Request, Response } from "express";
import MessageModel from "../models/message";
import UserModel from "../models/user";
import ChatModel from "../models/chat";
import { ExtendedRequest } from "../middleware/authMiddleware";
import { httpStatusCodes } from "../utils/statuscodes";
import mongoose, { Types } from "mongoose";
import { io } from "../server";



class MessageController {
    static async createChat(req: ExtendedRequest, res: Response){
        try{
            const userId = req.user._id
            const {receiverId} = req.params
            if(await ChatModel.findOne({
                users: { $all: [userId, receiverId] }
            })){
                return res
                .status(httpStatusCodes.OK)
                .json({msg: "Chat box exists."})
            } else {
                const chat = await ChatModel.create({})
                if(!chat)
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({error: "Unable to create chat box."})
          
                chat.users.push(userId,new mongoose.Types.ObjectId(receiverId))
                await chat.save()
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

            const message = await MessageModel.create({senderId, receiverId, content, chatId: chat._id})
            if(!message)
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({error: "Unable to send message."})


            chat.messages.push(message._id)
            await chat.save()
            await message.save()

            io.emit("send-message", content)
            return res
                .status(httpStatusCodes.OK)
                .json(message)
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
                users:{ $all:[userId]}
            })
            .populate({
                path: 'messages',
                select: 'content senderId receiverId -_id', // Include content and createdAt fields, exclude _id
                populate: {
                    path: 'senderId receiverId',
                    model: UserModel,
                    select: 'name email' // Select only name and email fields for sender
                }
            }).sort({ createdAt: -1 })
            .populate({
                path:'users',
                model:UserModel,
                select: 'name'
            })
            .sort({ createdAt: 1 })
            

            if(!message)
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({error: "Unable to fetch message."})
            

            return res
                .status(httpStatusCodes.OK)
                .json(message)
            
        } catch(err){
            console.log("Internal SErver Error")
            return res
                .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: "Internal Server Error"})
        }
    }

    static async fetchMessage(req: Request, res: Response){
        try{
            const {chatId} = req.params
            const message = await ChatModel.findById(chatId)
            if(!message)
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({error: "Unable to fetch message."})

            const json = await MessageModel.find({chatId:message._id}).populate({
                path:'senderId receiverId',
                model: UserModel,
                select: 'name '
            }).sort({createdAt: 1})

            io.emit('new-message', { chatId, message });

            return res
                .status(httpStatusCodes.OK)
                .json(json) 
        }catch(err){
            console.log("Internal SErver Error")
            return res
                .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: "Internal Server Error"})
        }
    }
}

export default MessageController