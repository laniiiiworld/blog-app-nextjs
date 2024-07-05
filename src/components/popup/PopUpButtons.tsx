'use client';

import { usePopUpContext } from '@/context/PopUpContext';
import PopUpButton from '../ui/PopUpButton';

type Props = {
  wantToClose?: boolean;
  handleConfirm: () => void;
};

export default function PopUpButtons({ wantToClose = true, handleConfirm }: Props) {
  const { setPopupType } = usePopUpContext();
  const handleClick = () => {
    handleConfirm();
    wantToClose && setPopupType('');
  };

  return (
    <div className='flex gap-4 justify-end mt-4'>
      <PopUpButton type='cancle' name='취소' handleClick={() => setTimeout(() => setPopupType(''), 0)} />
      <PopUpButton type='confirm' name='확인' handleClick={handleClick} />
    </div>
  );
}
