import ChatLobby from '../components/ChatLobby'
import Header from '../components/Header'
import ChatBox from '../components/ChatBox'
import { useAppDispatch, useAppSelector } from '../app/hooks'
// import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

const Home = () => {
  const modal = useAppSelector((state) => state.chatbox_modal_status.status)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/user/logout`, {
      });

      if (!response.ok) {
        alert("Something's wrong");
        return;
      }
      alert("Logout successful");
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
