'use client';

import ToggleButton from '@/components/ui/ToggleButton';
import HeartFillIcon from '@/components/ui/HeartFillIcon';
import HeartIcon from '@/components/ui/HeartIcon';
import { FaPen } from 'react-icons/fa';
import LoginPopup from './popup/LoginPopup';
import { usePopUpContext } from '@/context/PopUpContext';
import { useAuthContext } from '@/context/AuthContext';
import { useLikesContext } from '@/context/LikesContext';

export default function AsideIcons() {
  const { user } = useAuthContext();
  const { setPopupType } = usePopUpContext();
  const { likes, liked, updateLikes } = useLikesContext();
  const handleLikesClick = (updated: boolean) => {
    if (!user) {
      setPopupType('login');
      return;
    }
    updateLikes(updated);
  };

  return (
    <>
      <LoginPopup />
      <div className='py-4 flex gap-2'>
        <div className='flex flex-col items-center'>
          <ToggleButton
            toggled={liked}
            onToggle={handleLikesClick}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          <span className='text-light p-1'>{likes?.length}</span>
        </div>
        <button
          onClick={() => {
            const $comments = document.querySelector('#comments');
            if (!$comments) return;
            const { top } = $comments.getBoundingClientRect();
            window.scrollBy({ top: top - 80, behavior: 'smooth' });
          }}
          className='group text-2xl border-2 border-gray-200 rounded-full p-2 mb-auto text-light hover:text-green-800 hover:bg-gray-100 transition-all'
        >
          <FaPen className='group-hover:scale-110' />
        </button>
      </div>
    </>
  );
}
