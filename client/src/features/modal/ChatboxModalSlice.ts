import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'

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

export const modalStatus = (state: RootState) =>
  state.chatbox_modal_status.status

export default modalSlice.reducer
