import { useState } from 'react'
import ChatBoxFooter from './ChatBoxFooter'
import ChatBoxHeader from './ChatBoxHeader'
import ChatBody from './ChatBody'

const ChatBox: React.FC = () => {
  const [inputStatus, setInputStatus] = useState<boolean>(true)
  
  

  return (
    <div className='w-screen h-screen animate-slide flex flex-col'>
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
