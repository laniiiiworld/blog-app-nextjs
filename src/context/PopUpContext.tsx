'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

export type PopupType = '' | 'confirm' | 'email' | 'login' | 'postWrite' | 'savedPosts';
type Props = {
  children: ReactNode;
};

const PopUpContext = createContext({
  popupType: '' as PopupType,
  setPopupType: (value: PopupType) => {},
  value: '',
  setValue: (value: string) => {},
});

export function PopUpContextProvider({ children }: Props) {
  const [popupType, setPopupType] = useState<PopupType>('');
  const [value, setValue] = useState('');

  return <PopUpContext.Provider value={{ popupType, setPopupType, value, setValue }}>{children}</PopUpContext.Provider>;
}

export function usePopUpContext() {
  return useContext(PopUpContext);
}
