import React, { useEffect, useState } from 'react';
import image from '/icon.svg';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './ChatLobby';
import { fetch_message } from '../features/message/specificMessageSlice';
interface ImportData {
  setInputStatus: React.Dispatch<React.SetStateAction<boolean>>;
}


const ChatBody: React.FC<ImportData> = ({ setInputStatus }) => {
  const message = useAppSelector((state) => state.chatUser)
 const userId = useAppSelector((state) => state.auth.user)


  return (
    <>
      <div className='w-full h-inherit my-auto flex flex-col gap-5 justify-end'>
        <div
        onClick={() => setInputStatus((prevState) => !prevState)}
        className='w-full h-20 max-h-max bg-no-repeat bg-cover overflow-auto'>
        <div className={`w-full h-full flex flex-col  gap-5 overflow-auto`}>
            <div className={`w-5/6 h-full flex items-center gap-5 m-auto`}>
              <div className='w-10 h-10'>
                <img src={image} className='w-full h-full' alt='' />
              </div>
              <article className='max-w-[225px] bg-gray-500/20 p-3 rounded-2xl shadow-md'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, minus quaerat! Sunt ullam dolores rerum?
              </article>
            </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ChatBody;
