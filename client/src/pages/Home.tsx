import ChatLobby from '../components/ChatLobby'
import Header from '../components/Header'
import ChatBox from '../components/ChatBox'
import { useAppDispatch, useAppSelector } from '../app/hooks'
// import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import {logoutUser} from '../features/auth/authSlice'
import Cookies from 'js-cookie'
import React, { useEffect} from 'react'
import { fetch_messages, send_message } from '../features/message/messageSlice'
import { io } from 'socket.io-client'


const Home: React.FC = () => {
  const modal = useAppSelector((state) => state.chatbox_modal_status.status)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = Cookies.get('token')
  const userId = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    try {
      dispatch(logoutUser(navigate))
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred during logout");
    }
  };
  
  useEffect(() => {
    const fetchMessages = async () => {
      try{
        dispatch(fetch_messages(token))
      }
      catch(err){
        alert("Unable to fetch messages")
        return
      }
    }

    if(token){
      fetchMessages()
    }
  }, [dispatch, token, modal])

  useEffect(() => {
    const socket = io('http://localhost:5500')
    const connectSocket = () => {
          socket.emit('setup', { _id: userId });
  
          socket.on('connect', () => {
            console.log(`${socket.connected}, Socket.io connected`);
          });

          // socket.on('send-message', (content) => {
          //     dispatch(send_message(content))
          // })
  
        return () => {
          socket.disconnect();
          console.log('Disconnected');
        };
    }

    connectSocket()
  })

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
