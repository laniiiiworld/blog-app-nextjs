import { Post } from '@/service/posts';
import { Comment } from '@/components/Comments';
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function getPosts(): Promise<Post[]> {
  const snapshot = await get(ref(database, 'posts'));
  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    console.log('No data available');
  }
  return [];
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
