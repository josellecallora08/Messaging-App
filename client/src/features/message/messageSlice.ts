import { createSlice } from "@reduxjs/toolkit";


const messageSlice =  createSlice({
    name:'msg',
    initialState: null,
    reducers:{
        send_message: (state, action) => {
            action.payload = state
        }
    }
})

export const {send_message} = messageSlice.actions
export default messageSlice.reducer