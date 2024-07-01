'use client';

import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuthContext } from '@/context/AuthContext';
import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import PopUp from './PopUp';
import PopUpButton from '../ui/PopUpButton';

export type Login = 'Facebook' | 'Google' | 'Github';

const BUTTON_CLASS = 'p-2 rounded-full bg-slate-100 hover:bg-green-gray hover:shadow-md';

export default function LoginPopup() {
  const { login } = useAuthContext();
  const { popupType, setPopupType } = usePopUpContext();
  const handleLogin = (way: Login) => {
    if (!login(way)) return;
    setTimeout(() => setPopupType(''), 0);
  };

  if (popupType !== ('login' as PopupType)) return <></>;

  return (
    <PopUp width={'w-80'}>
      <>
        <h1 className='font-semibold text-xl text-slate-800'>소셜 계정으로 로그인</h1>
        <div className='flex justify-around text-4xl my-4'>
          <button onClick={() => handleLogin('Github')} className={BUTTON_CLASS}>
            <FaGithub className='rounded-full bg-white' />
          </button>
          <button onClick={() => handleLogin('Google')} className={BUTTON_CLASS}>
            <FcGoogle className='rounded-full bg-white' />
          </button>
          <button onClick={() => handleLogin('Facebook')} className={BUTTON_CLASS}>
            <FaFacebook className='rounded-full bg-white text-blue-600' />
          </button>
        </div>
        <PopUpButton type='cancle' name='취소' handleClick={() => setTimeout(() => setPopupType(''), 0)} />
      </>
    </PopUp>
  );
}
