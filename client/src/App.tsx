import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import Home from './pages/Home'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetch_messages } from './features/message/messageSlice';
import Cookies from 'js-cookie';
import { fetchUser } from './features/auth/authSlice';


function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth.isAuthenticated)
  const [update, setUpdate] = useState<boolean>(false)
  const token = Cookies.get('token')

  useEffect(() => {
    const fetch_user = async() => {
      try{
        dispatch(fetchUser(navigate))
      }catch(err){
        alert("hello")
      }
    }
    if(token){
      fetch_user()
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/form' element={auth ? <Navigate to={'/'}/> : <AuthForm />} />
        <Route path='/' element={auth ? <Home /> : <Navigate to={'/form'}/>} />
      </Routes>
    </>
  )
}

export default App
