import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { msgUrl } from "../../utils/urls";


const messageSlice =  createSlice({
    name:'msg',
    initialState: null,
    reducers:{
        success_fetch: (state, action) => {
            return action.payload
        }
    }
})

export const {success_fetch} = messageSlice.actions

export const fetch_messages = (token:any) => async(dispatch: any)=> {
    try{
        const user = await fetch(`${msgUrl}/`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        if(!user.ok){
            throw new Error("Unable to fetch chat messages.")
        }

        const json = await user.json()
        console.log(json)
        dispatch(success_fetch(json))
    } catch(err){
        alert("unable to fetch message")
        return
    }
}

export const send_message = (content: any, receiver: any, token:any) => async(dispatch: any) => {
    try{
        const message = await fetch(`${msgUrl}/send${receiver}`,{
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({content})
        })
        if(!message.ok){
            throw new Error("Unable to fetch chat messages.")
        }
        const json = await message.json()
        dispatch(success_fetch(json))
    }catch(err){
        alert("unable to send message")
        return
    }
}

export default messageSlice.reducer