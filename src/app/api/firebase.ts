import { Post } from '@/service/posts';
import { Comment } from '@/components/Comments';
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore';
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

export async function getPostComments(postId: string): Promise<[] | Comment[]> {
  try {
    const commentsRef = collection(database, 'posts', postId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
    const datas = await getDocs(commentsQuery);
    return datas.docs.map((doc) => doc.data() as Comment);
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function addPostComment(postId: string, comment: Comment) {
  try {
    return await setDoc(doc(database, 'posts', postId, 'comments', comment.id), comment);
  } catch (error) {
    console.log(error);
  }
}
