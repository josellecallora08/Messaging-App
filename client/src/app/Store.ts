import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/ChatboxModalSlice'
import authReducer from '../features/auth/authSlice'
import messageReducer from '../features/message/messageSlice'

export const Store = configureStore({
  reducer: {
    chatbox_modal_status: modalReducer,
    auth: authReducer,
    msg:messageReducer
  },
})

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch
