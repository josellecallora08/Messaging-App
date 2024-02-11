import { createSlice } from "@reduxjs/toolkit";
import { authUrl } from "../../utils/urls";

interface initialPayload{
    name: string
}
const fetchSlice = createSlice({
    name:"user",
    initialState: {} as initialPayload,
    reducers: {
        fetch_user: (state,action) => {
            return state = action.payload
        }
    }
})

export const {fetch_user} = fetchSlice.actions

export const fetchUser_info = (token:any, receiverId:any) => async(dispatch: any) => {
    try {
          const response = await fetch(`${authUrl}/${receiverId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if(!response.ok){
            alert("Failed to fetch information.")
            return
          } 
          const data = await response.json()
          console.log(data)
          dispatch(fetch_user(data));
      } catch (error) {
          console.error("Something went wrong:", error);
      }
}
export default fetchSlice.reducer