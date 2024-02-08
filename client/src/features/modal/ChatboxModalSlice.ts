import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import { msgUrl } from '../../utils/urls'

interface StatusState {
  status: boolean
}
const initialState: StatusState = {
  status: true,
}

export const modalSlice = createSlice({
  name: 'chatbox_modal_status',
  initialState,
  reducers: {
    open_modal: (state) => {
      state.status = !state.status
    },
  },
})
export const { open_modal } = modalSlice.actions

export const create_chatbox = (token:any) => async(dispatch:any) => {
  try{
    const user = await fetch(`${msgUrl}/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!user.ok){
        throw new Error("Unable to fetch chat messages.")
    }

    const json = await user.json()
    dispatch(open_modal(json))
} catch(err){
    alert("unable to fetch message")
    return
}
}

export const modalStatus = (state: RootState) =>
  state.chatbox_modal_status.status

export default modalSlice.reducer
