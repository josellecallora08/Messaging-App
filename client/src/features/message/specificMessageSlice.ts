import { createSlice } from "@reduxjs/toolkit";
import { msgUrl } from "../../utils/urls";


const specificMessageslice = createSlice({
    name: 'chatUser',
    initialState: [],
    reducers: {
        fetch_specific_message: (state,action)=>{
            return state = action.payload
        }
    }
})

export const {fetch_specific_message} = specificMessageslice.actions

export const fetch_message = (token: any, chatId: any) => async (dispatch: any) => {
    try {
      const response = await fetch(`${msgUrl}/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error("Unable to fetch chat messages.");
      }
  
      const json = await response.json(); // Assuming `json` is an array of messages
      dispatch(fetch_specific_message(json)); // Dispatching success action with messages
    } catch (err) {
      console.error("Error fetching messages:", err);
      alert("Unable to fetch messages asdasd");
    }
  };

export default specificMessageslice.reducer