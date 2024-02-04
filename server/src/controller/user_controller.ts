import UserModel from "../models/user";
import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../utils/statuscodes";
import bcrypt from 'bcrypt'
import { SessionData } from 'express-session'; // Import Session and SessionData

interface ExtendedSessionData extends SessionData {
  user?: {
    id: string; 
    email: string;
  };
}
  
class UserController {

    static async fetchUser(req: Request, res: Response){
        try{
            const users = await UserModel.find({})
            if(!users || users.length === 0) return res.status(httpStatusCodes.NOT_FOUND).json({error:"User not found"})

            return res.status(httpStatusCodes.FOUND).json({users})
        } catch(err){
            console.error("Error fetching user")
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
        }
    } 

    static async createUser(req: Request & {session: ExtendedSessionData}, res: Response){
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

            const details = {
                id: newUser._id.toString(),
                email: newUser.email
            }
            req.session.user = details

            await newUser.save()
            return res.status(httpStatusCodes.OK).json({newUser, msg:"Success!"})
        } catch(err){
            console.error({err})
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal server error"})
        }
    }

    static async loginUser(req: Request & {session: ExtendedSessionData}, res: Response){
        try{
            const {email, password} = req.body
            if(!email || !password) return res.status(httpStatusCodes.CONFLICT).json({error: "All fields are required"})
            
            const user = await UserModel.findOne({email})
            if(!user) return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
            
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) return res.status(httpStatusCodes.UNAUTHORIZED).json({error: "Invalid credentials"})
       
            const details = {
                id: user._id.toString(),
                email: user.email
            }
            req.session.user = details
            return res.status(httpStatusCodes.OK).json({msg: "Success!", user})
        } catch(err){
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
        }
    }

    static logoutUser(req: Request, res: Response): void {
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.clearCookie('token')
            res.status(200).json({ message: 'Logout successful' });
          }
        });
      }
      
}

export default UserController