'use client';

import { usePopUpContext } from '@/context/PopUpContext';
import PopUpButtons from './PopUpButtons';
import { ReactNode } from 'react';

type Props = {
  width: string;
  children: ReactNode;
  handleConfirm?: () => void;
};

export default function PopUp({ children, handleConfirm, width }: Props) {
  const { isShow } = usePopUpContext();

  return (
    <>
      {isShow && (
        <>
          <div className='fixed top-0 left-0 w-full h-full z-40 bg-white animate-popup-bg'></div>
          <div className='fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center'>
            <div
              className={`${width} absolute z-50 bg-white rounded-md shadow-md flex flex-col gap-3 justify-center p-6 animate-popup`}
            >
              {children}
              {handleConfirm && <PopUpButtons handleConfirm={handleConfirm} />}
            </div>
          </div>
        </>
      )}
    </>
  );
}
