import React, { useEffect, useRef } from 'react';
import image from '/icon.svg';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Cookies from 'js-cookie';
import { fetch_message } from '../features/message/specificMessageSlice';
import { io } from 'socket.io-client';
interface ImportData {
  setInputStatus: React.Dispatch<React.SetStateAction<boolean>>;
}


const ChatBody: React.FC<ImportData> = ({ setInputStatus }) => {
  const dispatch = useAppDispatch()
  const message = useAppSelector((state) => state.chatUser)
 const userId = useAppSelector((state) => state.auth.user)
  const token = Cookies.get('token')
  const chatId = useAppSelector((state) => state.chatId.chatId)

 useEffect(() => {
  const fetchMessage = async() => {
    dispatch(fetch_message(token, chatId))
  }
  fetchMessage()
},[dispatch])

useEffect(() => {
  const socket = io('http://localhost:5500');

  const connectSocket = () => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('receive-message', () => {
      console.log('Received a message');
      // Dispatch the fetch_message action with updated token and chatId
      if (token && chatId) {
        try {
          dispatch(fetch_message(token, chatId));
        } catch (error) {
          console.error("Error fetching messages:", error);
          // Handle the error as needed
        }
      }
    });
  };

  connectSocket();

  // Clean up the socket connection when the component unmounts
  return () => {
    socket.disconnect();
    console.log('Socket disconnected');
  };
}, [dispatch, token, chatId]);

const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messageContainerRef.current;
  
    if (container && message && message.length > 0) {
      container.scrollTop = container.scrollHeight;
    }
  }, [message]);
  

  return (
    <>
      <div className='w-full h-inherit my-auto flex flex-col gap-5 justify-end'>
          <div
          ref={messageContainerRef}
          onClick={() => setInputStatus((prevState) => !prevState)}
          className='w-full h-auto max-h-content max-h-max bg-no-repeat bg-cover overflow-auto'>
          <div className={`w-full h-full flex flex-col  gap-5`}>
            {message?.map((msg:any) => (
              <div key={msg._id} className={`w-5/6 h-full flex items-center ${msg.senderId._id === userId ? 'flex-row-reverse' : ''} gap-5 m-auto`}>
                <div className='w-10 h-10'>
                  <img src={image} className='w-full h-full' alt='' />
                </div>
                <article className='max-w-[225px] max-h-content h-auto bg-gray-500/20 p-3 rounded-2xl shadow-md'>
                  {msg.content}
                </article>
              </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
