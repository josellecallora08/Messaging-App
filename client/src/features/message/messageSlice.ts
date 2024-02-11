import { createSlice } from "@reduxjs/toolkit";
import { msgUrl } from "../../utils/urls";



const messageSlice = createSlice({
  name: 'msg',
  initialState: [],
  reducers: {
    success_fetch: (state, action) => {
      return state = action.payload; // Assuming payload is an array of messages
    },
    modify_fetch: (state) => {
      return state = []
    }
  }
});

export const { success_fetch, modify_fetch } = messageSlice.actions;

export const fetch_messages = (token: any) => async (dispatch: any) => {
  try {
    const user = await fetch(`${msgUrl}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    if (!user.ok) {
      throw new Error("Unable to fetch chat messages.")
    }

    const json = await user.json();
    console.log(json)
    dispatch(success_fetch(json));
  } catch (err) {
    console.error("Error fetching messages:", err);
    alert("Unable to fetch chat messages.");
  }
}



export const send_message = (content: any, receiver: any, token: any) => async (dispatch: any) => {
  try {
    const message = await fetch(`${msgUrl}/send${receiver}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    })
    if (!message.ok) {
      throw new Error("Unable to fetch chat messages.")
    }
    const json = await message.json();
    dispatch(success_fetch(json));
  } catch (err) {
    alert("unable to send message");
  }
}

export default messageSlice.reducer;
