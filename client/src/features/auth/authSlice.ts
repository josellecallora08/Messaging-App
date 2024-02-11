import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { authUrl } from "../../utils/urls";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../components/ChatLobby";


const authSlice = createSlice({
    name: 'auth',
    initialState:{
        isAuthenticated: false,
        user: null
    },
    reducers:{
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    }
});

export const { login, logout } = authSlice.actions;

export const registerUser = (navigate:any, name:any, email:any, password:any) => async (dispatch:any) => {
    try {
        const response = await fetch(`${authUrl}/register`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
          if(!response.ok){
              alert("Registation failed.")
              return
            } 
            const data = await response.json()
            const decodedToken = jwtDecode<JwtPayload>(data.token as string)
            dispatch(login(decodedToken._id));
            navigate('/');
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

export const loginUser = (navigate:any, email:any, password:any) => async (dispatch:any) => {
    try {
        const response = await fetch(`${authUrl}/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        });
        if(!response.ok){
          alert("Login failed.")
          return
        } 
        const data = await response.json()
        const decodedToken = jwtDecode<JwtPayload>(data.token as string)
        dispatch(login(decodedToken._id));
        navigate('/');
       
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

export const fetchUser = (navigate:any) => async (dispatch:any) => {
        try {
          const token = Cookies.get('token')
            const response = await fetch(`${authUrl}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(!response.ok){
              alert("Failed to fetch information.")
              return
            } 
            // const data = await response.json()
            const decodedToken = jwtDecode<JwtPayload>(token as string)
            dispatch(login(decodedToken._id));
            navigate('/');
        } catch (error) {
            console.error("Something went wrong:", error);
        }
};

export const logoutUser = (navigate:any) => async (dispatch :any) => {
    const token = Cookies.get('token');
    try {
        const response = await fetch(`${authUrl}/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            credentials: 'include'
        });
        if(!response.ok){
            alert('Logout failed..')
            return
        } 
        dispatch(logout());
        navigate('/login');
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

export default authSlice.reducer;
