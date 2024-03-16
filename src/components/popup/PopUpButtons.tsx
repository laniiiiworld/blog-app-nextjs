'use client';

import { usePopUpContext } from '@/context/PopUpContext';

type Props = {
  wantToClose?: boolean;
  handleConfirm: () => void;
};

export default function PopUpButtons({ wantToClose = true, handleConfirm }: Props) {
  const { setIsShow } = usePopUpContext();
  const handleClick = () => {
    handleConfirm();
    wantToClose && setIsShow(false);
  };

  return (
    <div className='flex gap-4 justify-end mt-4'>
      <button
        onClick={() => setTimeout(() => setIsShow(false), 0)}
        className='bg-white text-green-800 rounded-sm px-4 py-2 cursor-pointer hover:bg-gray-100'
      >
        취소
      </button>
      <button
        onClick={handleClick}
        className='bg-green-800 text-white rounded-sm px-4 py-2 cursor-pointer hover:brightness-125'
      >
        확인
      </button>
    </div>
  );
}
