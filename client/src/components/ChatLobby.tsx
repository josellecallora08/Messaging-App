import image from '/icon.svg'
import { useAppDispatch } from '../app/hooks'
import { open_modal } from '../features/modal/ChatboxModalSlice'

const ChatLobby = () => {
  const dispatch = useAppDispatch()
  const handleOpenChat = () => {
    dispatch(open_modal())
  }

  return (
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            ipsa fugit molestias! Maiores laboriosam, nihil quam facilis
            aspernatur repellendus sequi et eligendi assumenda saepe, ab
            corporis dolores! Modi natus numquam excepturi adipisci quo
            reiciendis eius provident eos aspernatur iusto. Reiciendis sapiente,
            minima aut laudantium et, at aliquid similique asperiores illum,
            maiores veniam.
          </p>
        </div>
      </div>
    </button>
    
  )
}

export default ChatLobby
