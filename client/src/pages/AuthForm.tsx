import { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

const AuthForm = () => {
  const [onLoginState, setLoginState] = useState<boolean>(true)
  return (
    <div className='bg-mobile w-screen h-screen bg-no-repeat bg-cover'>
      <div className='w-5/6 h-full grid grid-flow-row place-items-center m-auto md:grid-cols-2 '>
        <h1 className='font-extrabold text-6xl text-center md:absolute md:top-10 md:left-10'>
          Cha<span className='text-logo'>Talk</span>
        </h1>
        <figure className='hidden md:flex'>
          <img src={'/desktop-bg.svg'} alt='' />
        </figure>
        {onLoginState ? (
          <Login setLoginState={setLoginState} />
        ) : (
          <Signup setLoginState={setLoginState} />
        )}
      </div>
    </div>
  )
}

export default AuthForm
