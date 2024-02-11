import back from '/back.svg'
import image from '/icon.svg'
import { useAppDispatch } from '../app/hooks'
import { close_modal } from '../features/modal/ChatboxModalSlice'
import { modify_fetch } from '../features/message/messageSlice'
const ChatBoxHeader = () => {
  const dispatch = useAppDispatch()

  const handleModal = () => {
    dispatch(close_modal())
    dispatch(modify_fetch())
  }
  return (
    <div className='w-full h-full max-h-20 bg-theme'>
      <header className='relative w-5/6 h-full flex items-center m-auto gap-3'>
        <button
          onClick={handleModal}
          className='w-full h-full max-w-6 max-h-6 object-contain'
        >
          <img src={back} className='w-full h-full object-contain' alt='' />
        </button>
        <img src={image} className='w-11 h-11' alt='' />
        <p className='text-white'>Joselle Callora</p>
        <button className='w-full h-full max-w-8 max-h-8 absolute bg-white right-0 flex rounded-full items-center shadow-2xl'>
          <h1 className='w-full text-theme font-extrabold text-2xl text-center'>
            !
          </h1>
        </button>
      </header>
    </div>
  )
}

export default ChatBoxHeader
