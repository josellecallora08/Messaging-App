import React, { Dispatch, SetStateAction } from 'react'
import image from '/icon.svg'
interface ChatStatus {
  setInputStatus: Dispatch<SetStateAction<boolean>>
}

const ChatBody: React.FC<ChatStatus> = ({ setInputStatus }) => {
  return (
    <div
      onClick={() => setInputStatus((prevState) => !prevState)}
      className='w-full h-full bg-no-repeat bg-cover overflow-auto'>
      <div className='w-full h-auto max-h-max flex flex-col gap-5 overflow-auto'>
        <div className='w-5/6  h-auto flex item-center flex-row-reverse gap-5 m-auto'> 
          <div className='w-10 h-10'>
            <img src={image} className='w-full h-full' alt="" />
          </div>
          <article className='max-w-[225px] bg-gray-500/20 p-3 rounded-2xl shadow-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est numquam totam, nostrum voluptatem quas provident aliquid perferendis fuga aut esse itaque ipsa ab. Voluptas temporibus amet, nostrum obcaecati porro id?
          </article>
        </div>
        <div className='w-5/6  h-auto flex item-center gap-5 m-auto'> 
          <div className='w-10 h-10'>
            <img src={image} className='w-full h-full' alt="" />
          </div>
          <article className='max-w-[225px] bg-gray-500/20 p-3 rounded-2xl shadow-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est numquam totam, nostrum voluptatem quas provident aliquid perferendis fuga aut esse itaque ipsa ab. Voluptas temporibus amet, nostrum obcaecati porro id?
          </article>
        </div>
        <div className='w-5/6 h-auto flex item-center flex-row-reverse gap-5 m-auto'> 
          <div className='w-10 h-10'>
            <img src={image} className='w-full h-full' alt="" />
          </div>
          <article className='max-w-[225px] bg-gray-500/20 p-3 rounded-2xl shadow-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est numquam totam, nostrum voluptatem quas provident aliquid perferendis fuga aut esse itaque ipsa ab. Voluptas temporibus amet, nostrum obcaecati porro id?
          </article>
        </div>
        <div className='w-5/6  h-auto flex item-center gap-5 m-auto'> 
          <div className='w-10 h-10'>
            <img src={image} className='w-full h-full' alt="" />
          </div>
          <article className='max-w-[225px] bg-gray-500/20 p-3 rounded-2xl shadow-md'>
            Lorem ipsum dolor sit amet consectetur adipisicing 
          </article>
        </div>
      </div>
    </div>
  )
}

export default ChatBody
