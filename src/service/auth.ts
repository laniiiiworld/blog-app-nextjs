import { Login } from '@/components/popup/LoginPopup';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { FullUser } from '@/model/user';
import { addUser } from '@/service/users';

type Providers = {
  [key in Login]: GoogleAuthProvider | GithubAuthProvider | FacebookAuthProvider;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const providers: Providers = {
  Google: new GoogleAuthProvider(),
  Github: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
};

export function onUserStateChanged(callback: Dispatch<SetStateAction<FullUser | null>>) {
  try {
    onAuthStateChanged(auth, (user) => {
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
    signInWithPopup(auth, providers[way]) //
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
    signOut(auth);
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}
