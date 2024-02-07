import mongoose, {Document, ObjectId, Schema, Types} from 'mongoose'

interface Chat extends Document {
    users: {
        sender: ObjectId
        receiver: ObjectId
    }
    messages: Types.ObjectId[]
}

const ChatSchema = new Schema({
    users:{
        sender: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        receiver:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }]
}, {timestamps: true})

const ChatModel = mongoose.model<Chat>('chats', ChatSchema)

export default ChatModel