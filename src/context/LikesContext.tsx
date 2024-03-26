'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import useLikes from '@/hooks/useLikes';

type Props = {
  postId: string;
  children: ReactNode;
};

const LikesContext = createContext({
  isUpdating: false,
  setIsUpdating: (value: boolean) => {},
  liked: false,
  setLiked: (value: boolean) => {},
  likes: [] as String[],
  updateLikes: (value: boolean) => {},
});

export function LikesContextProvider({ postId, children }: Props) {
  const { user } = useAuthContext();
  const {
    likesQuery: { data: likes },
    updateLikes,
  } = useLikes(postId, user?.uid || '');
  const [liked, setLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLiked(likes?.includes(user?.uid || '') || false);
  }, [likes, user]);

  return (
    <LikesContext.Provider
      value={{
        isUpdating,
        setIsUpdating,
        liked,
        setLiked,
        likes: likes as string[],
        updateLikes: (updated) => {
          setIsUpdating(true);
          setLiked(updated);
          updateLikes(updated);
        },
      }}
    >
      {children}
    </LikesContext.Provider>
  );
}

export function useLikesContext() {
  return useContext(LikesContext);
}
