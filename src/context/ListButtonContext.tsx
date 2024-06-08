'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

const ListButtonContext = createContext({
  isList: false,
  handleToggle: () => {},
});

export function ListButtonContextProvider({ children }: Props) {
  const [isList, setIsList] = useState(false);
  const handleToggle = () => setIsList((prev) => !prev);
  return <ListButtonContext.Provider value={{ isList, handleToggle }}>{children}</ListButtonContext.Provider>;
}

export function useListButtonContext() {
  return useContext(ListButtonContext);
}
