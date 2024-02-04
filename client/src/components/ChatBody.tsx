import React, { Dispatch, SetStateAction } from 'react'

interface ChatStatus {
  setInputStatus: Dispatch<SetStateAction<boolean>>
}

const ChatBody: React.FC<ChatStatus> = ({ setInputStatus }) => {
  return (
    <div
      onClick={() => setInputStatus((prevState) => !prevState)}
      className='w-full h-full bg-mobile bg-no-repeat bg-cover'
    >
      ChatBody
    </div>
  )
}

export default ChatBody
