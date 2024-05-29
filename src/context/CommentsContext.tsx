'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
  postId: string;
  path: string;
  children: ReactNode;
};

const CommentsContext = createContext({
  postId: '',
  path: '',
  edited: '',
  setEdited: (value: string) => {},
});

export function CommentsContextProvider({ postId, path, children }: Props) {
  const [edited, setEdited] = useState('');

  return <CommentsContext.Provider value={{ postId, path, edited, setEdited }}>{children}</CommentsContext.Provider>;
}

export function useCommentsContext() {
  return useContext(CommentsContext);
}
