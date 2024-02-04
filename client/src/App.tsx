import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import Home from './pages/Home'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { is_login } from './features/auth/authSlice';



function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth.isAuthenticated)


  return (
    <>
      <Routes>
        <Route path='/form' element={auth ? <Navigate to={'/'}/> : <AuthForm />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
