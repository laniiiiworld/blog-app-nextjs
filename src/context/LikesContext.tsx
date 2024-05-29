'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useLikes } from '@/hooks/useLikes';

type Props = {
  postId: string;
  path: string;
  children: ReactNode;
};

const LikesContext = createContext({
  isUpdating: false,
  setIsUpdating: (value: boolean) => {},
  liked: false,
  likes: [] as String[],
  updateLikes: (value: boolean) => {},
});

export function LikesContextProvider({ postId, path, children }: Props) {
  const { user } = useAuthContext();
  const { likes, updateLikes } = useLikes({ path });
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
        likes,
        updateLikes: (updated) => {
          setIsUpdating(true);
          setLiked(updated);
          updateLikes.mutate({ postId, like: updated });
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
