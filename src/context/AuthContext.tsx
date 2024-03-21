'use client';

import { login, logout, onUserStateChanged } from '@/app/api/firebase';
import { User } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({
  user: null as User | null,
  login,
  logout,
});

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);
  return <AuthContext.Provider value={{ user, login, logout }}> {children} </AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
