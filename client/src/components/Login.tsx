import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { is_login, login } from '../features/auth/authSlice'

interface LoginProps {
  setLoginState: Dispatch<SetStateAction<boolean>>
}

interface FieldSet {
  email: string
  password: string
}

const Login: React.FC<LoginProps> = ({ setLoginState }) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const [field, setField] = useState<FieldSet>({
    email: '',
    password: '',
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setField((components) => ({
      ...components,
      [name]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:5500/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          email: field.email,
          password: field.password
        }),
        credentials: 'include'
      })
      if(!response.ok) throw new Error("Invalid credentials")
      
      const json = await response.json()
      console.log(json)
      dispatch(login(json))
      navigate('/')
      console.log(response.headers.get('Set-Cookie'))

    } catch(err){
      throw new Error("asoidjasoidjaosidj")
    }
  }

  
  return (
    <>
      <form
        onSubmit={handleLogin}
        className='h-full max-h-60 w-full flex flex-wrap gap-5 md:h-4/5 md:max-h-60 md:w-3/5'
      >
        <div className='w-full md:m-auto max-h-14 h-full'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            id='email'
            value={field.email}
            onChange={handleInput}
            required
            className=' w-full h-full rounded-full outline-none shadow-inner shadow-violet-400 border border-theme pl-5 md:rounded-md'
          />
        </div>
        <div className='w-full md:m-auto max-h-14 h-full'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            id='password'
            value={field.password}
            onChange={handleInput}
            required
            className=' w-full h-full rounded-full outline-none shadow-inner shadow-violet-400 border border-theme pl-5 md:rounded-md'
          />
        </div>
        <div className='w-full md:m-auto max-h-14 h-full'>
          <input
            type='submit'
            name='login'
            id='login'
            value='Login'
            className='w-full h-full rounded-full outline-none shadow shadow-violet-400 border border-theme bg-white font-bold cursor-pointer hover:bg-theme ease-in-out hover:border-white text-theme hover:text-white duration-300 md:duration-0 active:bg-white  md:rounded-md'
          />
        </div>
        <p className='m-auto md:m-0'>
          Don't have account?{' '}
          <button
            onClick={() => setLoginState((prevState) => !prevState)}
            className='text-center md:text-left text-logo hover:underline'
          >
            Sign up here
          </button>
        </p>
      </form>
    </>
  )
}

export default Login
