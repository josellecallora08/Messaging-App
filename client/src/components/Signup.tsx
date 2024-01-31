import React, { Dispatch, SetStateAction, useState } from 'react'

interface SignupProp {
  setLoginState: Dispatch<SetStateAction<boolean>>
}

interface FieldSet {
  name: string
  email: string
  password: string
  confirm_password: string
}
const Signup: React.FC<SignupProp> = ({ setLoginState }) => {
  const [field, setField] = useState<FieldSet>({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setField((components) => ({
      ...components,
      [name]: value,
    }))
  }

  return (
    <>
      <form className='h-4/5 w-full flex flex-wrap gap-5 md:w-3/5 md:h-3/5 md:max-h-60'>
        <div className='w-full max-h-14 h-full '>
          <input
            type='text'
            placeholder='Name'
            name='name'
            id='name'
            value={field.name}
            onChange={handleInput}
            required
            className=' w-full h-full rounded-full outline-none shadow-inner shadow-violet-400 border border-theme pl-5 md:rounded-md'
          />
        </div>
        <div className='w-full max-h-14 h-full'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            id='email'
            required
            className=' w-full h-full rounded-full outline-none shadow-inner shadow-violet-400 border border-theme pl-5 md:rounded-md'
          />
        </div>
        <div className='w-full max-h-14 h-full'>
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
        <div className='w-full max-h-14 h-full'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirm_password'
            id='confirm_password'
            value={field.confirm_password}
            onChange={handleInput}
            required
            className=' w-full h-full rounded-full outline-none shadow-inner shadow-violet-400 border border-theme pl-5 md:rounded-md'
          />
        </div>
        <div className='w-full max-h-14 h-full'>
          <input
            type='submit'
            name='signup'
            id='signup'
            value='Sign Up'
            className='w-full h-full rounded-full outline-none shadow shadow-violet-400 border border-theme bg-white font-bold cursor-pointer hover:bg-theme ease-in-out hover:border-white text-theme hover:text-white duration-300 active:bg-white  md:rounded-md'
          />
        </div>
        <p className='m-auto md:m-0'>
          Have an account?{' '}
          <button
            onClick={() => setLoginState(true)}
            className='text-logo hover:underline md:w-fit text-center'
          >
            Login here
          </button>
        </p>
      </form>
    </>
  )
}

export default Signup
