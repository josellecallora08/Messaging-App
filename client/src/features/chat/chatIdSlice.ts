import { createSlice } from "@reduxjs/toolkit";

const chatIdSlice = createSlice({
    name:"ChatId",
    initialState: {
        chatId: null,
        receiver: null

    },
    reducers: {
        fetch_chatId:(state,action) => {
            state.chatId = action.payload
        },
        fetch_receiverId:(state, action) => {
            state.receiver = action.payload
        }
    }
})

export const {fetch_chatId, fetch_receiverId} = chatIdSlice.actions

export default chatIdSlice.reducer