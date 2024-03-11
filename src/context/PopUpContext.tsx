'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

const PopUpContext = createContext({
  isShow: false,
  setIsShow: (value: boolean) => {},
  value: '',
  setValue: (value: string) => {},
});

export function PopUpContextProvider({ children }: Props) {
  const [isShow, setIsShow] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isShow]);

  return <PopUpContext.Provider value={{ isShow, setIsShow, value, setValue }}> {children} </PopUpContext.Provider>;
}

export function usePopUpContext() {
  return useContext(PopUpContext);
}
