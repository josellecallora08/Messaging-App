import mongoose, { Document, Schema } from 'mongoose'

interface User extends Document{
    name: string,
    email: string,
    password: string
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },  
    password: {
        type: String,
        required: true
    }

}, {timestamps: true})

const UserModel = mongoose.model<User>('users', UserSchema)

export default UserModel