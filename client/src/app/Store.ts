import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/ChatboxModalSlice'

export const Store = configureStore({
  reducer: {
    chatbox_modal_status: modalReducer,
  },
})

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch
