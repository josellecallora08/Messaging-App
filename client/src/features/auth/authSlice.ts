import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        isAuthenticated: false,
        user: null
    },
    reducers:{
        login: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        }
    }
})

export const {login, logout} = authSlice.actions

export const is_login = (navigate: any) => async (dispatch: any) =>  {
  const token = Cookies.get();
    console.log(token)
    if (token) {
      try {
        const response = await fetch(`http://localhost:5500/api/user/login`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));
          navigate('/');
        } 
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    } else {
      dispatch(logout())
    }
  }

export default authSlice.reducer