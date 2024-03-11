'use client';

import { usePopUpContext } from '@/context/PopUpContext';

type Props = {
  title: string;
  message: string;
  handleConfirm: () => void;
};

export default function PopUp({ title, message, handleConfirm }: Props) {
  const { isShow, setIsShow } = usePopUpContext();
  const handleClick = () => {
    handleConfirm();
    setIsShow(false);
  };

  return (
    <>
      {isShow && (
        <>
          <div className='fixed top-0 left-0 w-full h-full z-40 bg-white animate-popup-bg'></div>
          <div className='fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center'>
            <div className='absolute w-80 z-50 bg-white rounded-md shadow-md flex flex-col gap-3 justify-center p-6 animate-popup'>
              <h3 className='text-xl font-semibold'>{title}</h3>
              <span>{message}</span>
              <div className='flex gap-4 justify-end mt-4'>
                <button
                  onClick={() => setIsShow(false)}
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
