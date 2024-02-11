import mongoose, {Document, Schema, Types} from 'mongoose'

interface Chat extends Document {
    users: Types.ObjectId[]
    messages: Types.ObjectId[]
}

const ChatSchema = new Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }]
}, {timestamps: true})

const ChatModel = mongoose.model<Chat>('chats', ChatSchema)

export default ChatModel