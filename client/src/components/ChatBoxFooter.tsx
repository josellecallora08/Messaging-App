import { Dispatch, SetStateAction, useState } from 'react'
import ok from '/ok.svg'
import send from '/send.svg'
import Cookies from 'js-cookie'
interface ChatStatus {
  inputStatus: boolean
  setInputStatus: Dispatch<SetStateAction<boolean>>
}

const ChatBoxFooter: React.FC<ChatStatus> = ({
  inputStatus,
  setInputStatus,
}) => {
  const token = Cookies.get('token')
  const [messages, setMessages]=useState<String>('')



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const sendMessage = await fetch(``,{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          messages
        })
      })
      if(!sendMessage.ok){
        throw new Error("Unable to send message. Please try again later...")
      }
      // update handler
    } catch(err) {
      throw new Error("Unable to send message. Please try again later...")
    }
  }
  return (
    <div className='bottom-0 w-full h-full min-h-20 max-h-28 bg-theme'>
      <form onSubmit={handleSubmit} className='w-5/6 h-full flex items-center justify-between gap-3 m-auto'>
        <div className='w-full h-full max-h-10 rounded-full overflow-hidden flex items-center'>
          {inputStatus ? (
            <textarea
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
