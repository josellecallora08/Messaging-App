import ChatLobby from '../components/ChatLobby'
import Header from '../components/Header'
import ChatBox from '../components/ChatBox'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { useEffect, useState } from 'react'

const Home = () => {
  const [userId, setUserId] = useState('')
  const modal = useAppSelector((state) => state.chatbox_modal_status.status)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const socket = io("http://localhost:5500")

  //   socket.emit('setup', { _id: `${userId}` }); // Replace 'yourUserId' with the actual user ID

  //   socket.on("connect", () => {
  //     console.log(`${socket.connected}, Socket.io connected`); // true
  //   });
  //   return () => {
  //     socket.disconnect();
  //     console.log("Disconnected")
  //   };
  // }, [])

  const handleLogout = async () => {
    try {
      dispatch(logout())
      navigate('/form');
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred during logout");
    }
  };
  

  return (
    <div className='overflow-hidden'>
      {modal ? (
        <div className='h-screen w-screen bg-mobile bg-no-repeat bg-cover animate-slide'>
          <div className='fixed h-full w-full '>
            <Header />
            <button onClick={handleLogout}>Logout</button>
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
