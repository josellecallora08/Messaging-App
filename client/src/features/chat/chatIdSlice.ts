import { createSlice } from "@reduxjs/toolkit";

const chatIdSlice = createSlice({
    name:"ChatId",
    initialState: null,
    reducers: {
        fetch_chatId:(state,action) => {
            return state = action.payload
        }
    }
})

export const {fetch_chatId} = chatIdSlice.actions

export default chatIdSlice.reducer