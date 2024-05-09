import { Login } from '@/components/popup/LoginPopup';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export function onUserStateChanged(callback: Dispatch<SetStateAction<User | null>>) {
  try {
    onAuthStateChanged(auth, async (user) => callback(user));
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function login(way: Login): boolean {
  try {
    if (way === 'Google') {
      signInWithPopup(auth, googleProvider);
      return true;
    } else if (way === 'Github') {
      signInWithPopup(auth, githubProvider);
      return true;
    } else if (way === 'Facebook') {
      signInWithPopup(auth, facebookProvider);
      return true;
    }
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
