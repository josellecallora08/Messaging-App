import image from '/icon.svg'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { create_chatbox } from '../features/modal/ChatboxModalSlice'
import Cookies from 'js-cookie'
import { fetch_messages } from '../features/message/messageSlice'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { fetch_chatId } from '../features/chat/chatIdSlice'

export interface JwtPayload {
  _id: string;
  // Other fields if present
}

const ChatLobby: React.FC = () => {
  const chat = useAppSelector((state) => state.msg)
  const dispatch = useAppDispatch()
  const token = Cookies.get('token')
  const modal = useAppSelector((state)=> state.chatbox_modal_status)
  const userId = useAppSelector((state) => state.auth.user)

  const handleOpenChat = async(chatId: any) => {
    dispatch(create_chatbox(token))
    dispatch(fetch_chatId(chatId))
  }




  return (
   <>
          <button
          onClick={handleOpenChat}
          className='w-full h-full max-h-20 flex justify-center items-center gap-5 duration-200 hover:backdrop-blur-xl'
        >
          <div className='w-5/6 m-auto h-full max-h-20 flex items-center gap-5'>
            <figure className='w-12 h-12 '>
              <img src={image} alt='' />
            </figure>
            <div className='w-fit text-left'>
              <h4 className=''>Joselle E. Callora</h4>
              <p className='text-xs text-ellipsis max-w-60 w-full overflow-hidden whitespace-nowrap'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet ratione aperiam autem est quasi id soluta eum, itaque corporis corrupti!
              </p>
            </div>
          </div>
        </button>
   </>
    
  )
}

export default ChatLobby
