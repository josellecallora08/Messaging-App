import image from '/icon.svg'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { create_chatbox } from '../features/modal/ChatboxModalSlice'
import Cookies from 'js-cookie'
import { fetch_chatId, fetch_receiverId } from '../features/chat/chatIdSlice'

export interface JwtPayload {
  _id: string;
  // Other fields if present
}

const ChatLobby: React.FC = () => {
  const chat = useAppSelector((state) => state.msg)
  const dispatch = useAppDispatch()
  const token = Cookies.get('token')
  const userId = useAppSelector((state) => state.auth.user)

  const handleOpenChat = async(chatId: any, receiver:any) => {
    dispatch(create_chatbox(token))
    dispatch(fetch_chatId(chatId))
    console.log(receiver)
    dispatch(fetch_receiverId(receiver))
  }

  return (
   <>
        {chat.map((val:any) => (
          <button
          key={val._id}
          onClick={() => handleOpenChat(val._id, val.users.filter((user:any) => user._id !== userId).map((user:any) => user._id).toString())}
          className='w-full h-full max-h-20 flex justify-center items-center gap-5 duration-200 hover:backdrop-blur-xl'
        >
          <div className='w-5/6 m-auto h-full max-h-20 flex items-center gap-5'>
            <figure className='w-12 h-12 '>
              <img src={image} alt='' />
            </figure>
            <div className='w-fit text-left'>
              <h4 className=''>{val.users.filter((user:any) => user._id !== userId).map((user:any) => user.name)}</h4>
              <p className='text-xs text-ellipsis max-w-60 w-full overflow-hidden whitespace-nowrap'>
              {val.messages.length > 0 ? val.messages[val.messages.length - 1].content : ''}
              </p>
            </div>
          </div>
        </button>
        ))}
   </>
    
  )
}

export default ChatLobby
