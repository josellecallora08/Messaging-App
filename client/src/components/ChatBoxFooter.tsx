import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ok from '/ok.svg'
import send from '/send.svg'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { send_message } from '../features/message/messageSlice'
import { io } from 'socket.io-client'
interface ChatStatus {
  inputStatus: boolean
  setInputStatus: Dispatch<SetStateAction<boolean>>
}

const ChatBoxFooter: React.FC<ChatStatus> = ({
  inputStatus,
  setInputStatus,
}) => {
  const dispatch = useAppDispatch()
  const token = Cookies.get('token')
  const [messages, setMessages]=useState<String>('')
  const chatId = useAppSelector((state) => state.chatId.chatId)
  const receiver = useAppSelector((state) => state.chatId.receiver)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      setMessages('')
      dispatch(send_message(messages, receiver, token, chatId))
      const socket = io('http://localhost:5500');
      socket.emit('send-message', { content: messages, receiverId: receiver, chatId });
      
    } catch(err) {
      alert("Cannot send empty message")
      return
    }
  }

  
  useEffect(() => {
    const scrollDown = async() => {
      window.scrollX
    }
  })
  
  return (
    <div className='w-full h-full min-h-20 max-h-28 bg-theme'>
      <form onSubmit={handleSubmit} className='w-5/6 h-full flex items-center justify-between gap-3 m-auto'>
        <div className='w-full h-full max-h-10 rounded-full overflow-hidden flex items-center'>
          {inputStatus ? (
            <textarea
              value={messages as string}
              onChange={(e) => setMessages(e.target.value)}
              placeholder='Type a Message'
              className='w-full h-full max-h-16 shadow-md-inner outline-none rounded-full py-2 px-5'
            />
          ) : (
            <button
              onClick={() => setInputStatus((prevState) => !prevState)}
              className='w-full h-full rounded-full  max-h-16 shadow-md-inner bg-white outline-none  px-5 text-left text-placeholder'
            >
              Send a Message...
            </button>
          )}
        </div>
        {inputStatus ? (
          <button className='bg-white p-2 rounded-full'>
            <img src={send} alt='' />
          </button>
        ) : (
          <button type='submit'>
            <img src={ok} alt='' />
          </button>
        )}
      </form>
    </div>
  )
}

export default ChatBoxFooter
