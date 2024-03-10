import { Post } from '@/service/posts';
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getFirestore(app);

export async function getPosts(): Promise<Post[]> {
  const postsRef = collection(database, 'posts');
  const postsQuery = query(postsRef, orderBy('date', 'asc'));
  const datas = await getDocs(postsQuery);
  return datas.docs.map((doc) => doc.data() as Post);
}

export function onUserStateChanged(callback: Dispatch<SetStateAction<User | null>>) {
  try {
    onAuthStateChanged(auth, async (user) => callback(user));
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function login() {
  try {
    signInWithPopup(auth, provider);
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function logout() {
  try {
    signOut(auth);
  } catch (error: any) {
    const { code, message } = error;
    console.error(code, message);
  }
}
