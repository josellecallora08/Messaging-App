import ChatLobby from '../components/ChatLobby'
import Header from '../components/Header'
import ChatBox from '../components/ChatBox'
import { useAppSelector } from '../app/hooks'

const Home = () => {
  const modal = useAppSelector((state) => state.chatbox_modal_status.status)

  return (
    <div className='overflow-hidden'>
      {modal ? (
        <div className='h-screen w-screen bg-mobile bg-no-repeat bg-cover animate-slide'>
          <div className='fixed h-full w-full '>
            <Header />
            <div className='w-full h-full m-auto'>
              <ChatLobby />
            </div>
          </div>
        </div>
      ) : (
        <ChatBox />
      )}
    </div>
  )
}

export default Home
