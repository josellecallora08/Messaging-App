import { createSlice } from "@reduxjs/toolkit";

interface SocketState{
    socket: any
}
const initialState: SocketState = {
    socket: null
}

const socketSlice = createSlice({
    name:"socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
          state.socket = action.payload;
        },
    }
})

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: { socket: SocketState }) => state.socket.socket;
export default socketSlice.reducer;