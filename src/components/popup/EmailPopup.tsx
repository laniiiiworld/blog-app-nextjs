import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import ContactForm from '../ContactForm';
import PopUp from './PopUp';

export default function EmailPopup() {
  const { popupType } = usePopUpContext();

  if (popupType !== ('email' as PopupType)) return <></>;

  return (
    <PopUp width='w-full max-w-[40rem]'>
      <ContactForm />
    </PopUp>
  );
}
