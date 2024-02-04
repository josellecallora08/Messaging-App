import { Dispatch, SetStateAction } from 'react'
import ok from '/ok.svg'
import send from '/send.svg'
interface ChatStatus {
  inputStatus: boolean
  setInputStatus: Dispatch<SetStateAction<boolean>>
}

const ChatBoxFooter: React.FC<ChatStatus> = ({
  inputStatus,
  setInputStatus,
}) => {
  
  return (
    <div className='fixed bottom-0 w-full h-full min-h-20 max-h-28 bg-theme'>
      <div className='w-5/6 h-full flex items-center justify-between gap-3 m-auto'>
        <div className='w-full h-full max-h-10 rounded-full overflow-hidden flex items-center'>
          {inputStatus ? (
            <textarea
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
          <button>
            <img src={ok} alt='' />
          </button>
        )}
      </div>
    </div>
  )
}

export default ChatBoxFooter
