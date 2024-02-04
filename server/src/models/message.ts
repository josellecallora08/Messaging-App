import mongoose, { Document, Schema } from "mongoose"

interface Message extends Document{
    sender: mongoose.Schema.Types.ObjectId,
    receiver: mongoose.Schema.Types.ObjectId,
    content: string,
}

const MessageSchema = new Schema({
    sender: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required:true
    }
}, {timestamps: true})

const MessageModel = mongoose.model<Message>('message', MessageSchema)

export default MessageModel