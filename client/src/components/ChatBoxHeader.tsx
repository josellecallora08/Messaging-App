import back from '/back.svg'
import image from '/icon.svg'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { close_modal } from '../features/modal/ChatboxModalSlice'
import { modify_fetch } from '../features/message/messageSlice'
import { useEffect } from 'react'
import { fetchUser_info } from '../features/user/userSlice'
import Cookies from 'js-cookie'
const ChatBoxHeader = () => {
  const dispatch = useAppDispatch()
  const receiver = useAppSelector((state) => state.chatId.receiver)
  const token = Cookies.get('token')
  const user = useAppSelector((state) => state.user)
  const handleModal = () => {
    dispatch(close_modal())
    dispatch(modify_fetch())
  }
  useEffect(() => {
    const fetchName = async() => {
      try{
        dispatch(fetchUser_info(token,receiver))  
      }catch(err){
        console.log("Wrong fetching name")
        return
      }
    }
    fetchName()
  }, [token, receiver])
  
  return (
   <>
     <div className='w-full h-full max-h-20 bg-theme'>
     <header className='relative w-5/6 h-full flex items-center m-auto gap-3'>
       <button
         onClick={handleModal}
         className='w-full h-full max-w-6 max-h-6 object-contain'
       >
         <img src={back} className='w-full h-full object-contain' alt='' />
       </button>
       <img src={image} className='w-11 h-11' alt='' />
       <p className='text-white'>{user.name}</p>
       <button className='w-full h-full max-w-8 max-h-8 absolute bg-white right-0 flex rounded-full items-center shadow-2xl'>
         <h1 className='w-full text-theme font-extrabold text-2xl text-center'>
           !
         </h1>
       </button>
     </header>
   </div>
   </>
  )
}

export default ChatBoxHeader
