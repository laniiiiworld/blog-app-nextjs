import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, getAuth } from 'firebase/auth';
import { Login } from '@/components/popup/LoginPopup';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

type Providers = {
  [key in Login]: GoogleAuthProvider | GithubAuthProvider | FacebookAuthProvider;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();
export const firebaseDB = getFirestore(app);
export const storage = getStorage();

export const providers: Providers = {
  Google: new GoogleAuthProvider(),
  Github: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
};
