import { Login } from '@/components/popup/LoginPopup';
import { onAuthStateChanged, signInWithPopup, signOut, UserCredential } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { FullUser } from '@/model/user';
import { addUser } from '@/service/users';
import { firebaseAuth, providers } from './firebase';

export function onUserStateChanged(callback: Dispatch<SetStateAction<FullUser | null>>) {
  try {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, photoURL, email, displayName } = user;
        callback({ uid, photoURL, email, displayName });
      } else {
        callback(null);
      }
    });
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function login(way: Login): boolean {
  try {
    signInWithPopup(firebaseAuth, providers[way]) //
      .then(({ user }: UserCredential) => {
        const { uid, photoURL, email, displayName } = user;
        addUser({ uid, photoURL, email, displayName });
      });
    return true;
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
  return false;
}

export function logout() {
  try {
    signOut(firebaseAuth);
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}
