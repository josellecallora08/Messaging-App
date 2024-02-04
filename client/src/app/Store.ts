import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/ChatboxModalSlice'
import authReducer from '../features/auth/authSlice'

export const Store = configureStore({
  reducer: {
    chatbox_modal_status: modalReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch
