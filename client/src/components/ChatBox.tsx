import { useEffect, useState } from 'react'
import ChatBoxFooter from './ChatBoxFooter'
import ChatBoxHeader from './ChatBoxHeader'
import ChatBody from './ChatBody'
import { useAppDispatch } from '../app/hooks'
import { is_login } from '../features/auth/authSlice'
import { fetch_messages } from '../features/message/messageSlice'
import Cookies from 'js-cookie'

const ChatBox: React.FC = () => {
  const [inputStatus, setInputStatus] = useState<boolean>(true)
  const [update, setUpdate] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const token = Cookies.get('token')
  
  useEffect(() => {
    const fetchUser = async() => {
      try{
        setUpdate(true)
        dispatch(fetch_messages(setUpdate, token))
      }catch(err){

      }
    }

    if(token){
      fetchUser()
    }
  }, [update])
  
  return (
    <div className='w-screen h-screen animate-slide flex flex-col '>
      <ChatBoxHeader />
      <ChatBody setInputStatus={setInputStatus} />
      <ChatBoxFooter
        inputStatus={inputStatus}
        setInputStatus={setInputStatus}
      />
    </div>
  )
}

export default ChatBox
