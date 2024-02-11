import UserModel from "../models/user";
import { Request, Response, NextFunction } from "express";
import {ExtendedRequest} from '../middleware/authMiddleware'
import { httpStatusCodes } from "../utils/statuscodes";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface PayloadToken {
    _id:string
    email:string
}

export const createToken = ({_id, email}: PayloadToken): string => {
    return jwt.sign({_id, email}, process.env.SECRET as string, {expiresIn: '3d'})
}  

class UserController {
    
    static async fetchOneUser(req: ExtendedRequest, res: Response){
        try{    
            const {receiverId} = req.params
            const users = await UserModel.findById({_id:receiverId})
            if(!users) return res.status(httpStatusCodes.NOT_FOUND).json({error:"User not found"})

            return res.status(httpStatusCodes.OK).json(users)
        } catch(err){
            console.error("Error fetching user")
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
        }
    }

    static async fetchUser(req: ExtendedRequest, res: Response){
        try{    
            const userId = req.user._id
            const users = await UserModel.findById({_id:userId})
            if(!users) return res.status(httpStatusCodes.NOT_FOUND).json({error:"User not found"})

            return res.status(httpStatusCodes.OK).json({users})
        } catch(err){
            console.error("Error fetching user")
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
        }
    } 

    static async createUser(req: Request, res: Response){
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password) return res.status(httpStatusCodes.BAD_REQUEST).json({error: "All fields are required."})
            
            if(await UserModel.findOne({email})) return res.status(httpStatusCodes.UNAUTHORIZED).json({error: "Email has already been taken"})
            
            const salt = await bcrypt.genSalt(10)
            if(!salt) return res.status(httpStatusCodes.CONFLICT).json({error: "Unable to generate salt rounds"})
            
            const hashed = await bcrypt.hash(password,salt)
            if(!hashed) return res.status(httpStatusCodes.CONFLICT).json({error: "Unable to hash password"})
            
            const newUser = new UserModel({name,email,password:hashed})
            if(!newUser) return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Unable to sign up"})

            const token = createToken({ _id: newUser._id.toString(), email: newUser.email });
            res.cookie('token', token, { maxAge: 900000});

            await newUser.save()
            return res.status(httpStatusCodes.OK).json({newUser, msg:"Success!", token})
        } catch(err){
            console.error({err})
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal server error"})
        }
    }

    static async loginUser(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body
            if(!email || !password) return res.status(httpStatusCodes.CONFLICT).json({error: "All fields are required"})
            
            const user = await UserModel.findOne({email})
            if(!user) return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
            
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) return res.status(httpStatusCodes.UNAUTHORIZED).json({error: "Invalid credentials"})
       
            const token = createToken({ _id: user._id.toString(), email: user.email });
            res.cookie('token', token, { maxAge: 900000 });
            return res.status(httpStatusCodes.OK).json({msg: "Success!", user, token})
        } catch(err){
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
        }
    }

    static async logoutUser(req:Request, res:Response){
        try{
           res.clearCookie('token')
           return res.status(httpStatusCodes.OK).json({ msg: "Logout successful" });
        }catch(err){
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
        }
    }
}

export default UserController