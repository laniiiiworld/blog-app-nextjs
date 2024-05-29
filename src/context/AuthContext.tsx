'use client';

import { login, logout, onUserStateChanged } from '@/service/auth';
import { FullUser } from '@/model/user';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({
  user: null as FullUser | null,
  login,
  logout,
});

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<FullUser | null>(null);

  useEffect(() => {
    onUserStateChanged((successUser) => setUser(successUser));
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}> {children} </AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
