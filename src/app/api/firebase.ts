import { Post } from '@/service/posts';
import { Comment } from '@/components/Comments';
import { Login } from '@/components/popup/LoginPopup';
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
import { initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, setDoc } from 'firebase/firestore';
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
const database = getFirestore(app);

export async function getPosts(): Promise<Post[] | []> {
  try {
    const postsRef = collection(database, 'posts');
    const postsQuery = query(postsRef, orderBy('date', 'asc'));
    const datas = await getDocs(postsQuery);
    return Promise.all(
      datas.docs.map(async (doc) => {
        const post = doc.data() as Post;
        const commentsRef = collection(doc.ref, 'comments');
        const comments = await getDocs(commentsRef);
        return { ...post, repliesCount: comments.size };
      })
    );
  } catch (error) {
    console.log(error);
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

export async function updatePostComment(postId: string, comment: Comment) {
  try {
    return await setDoc(doc(database, 'posts', postId, 'comments', comment.id), comment);
  } catch (error) {
    console.log(error);
  }
}

export async function removePostComment(postId: string, commentId: string) {
  return await deleteDoc(doc(database, 'posts', postId, 'comments', commentId));
}

export async function getPostLikes(postId: string): Promise<[] | string[]> {
  try {
    const likesRef = collection(database, 'posts', postId, 'likes');
    const datas = await getDocs(likesRef);
    return datas?.docs.map((doc) => doc.data()?.userId);
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function plusLikeCount(postId: string, userId: string) {
  try {
    const likes: string[] = await getPostLikes(postId);
    if (likes.includes(userId)) return;
    await setDoc(doc(database, 'posts', postId, 'likes', userId), { userId });
  } catch (error) {
    console.log(error);
  }
}

export async function minusLikeCount(postId: string, userId: string) {
  try {
    const likes: string[] = await getPostLikes(postId);
    if (!likes.includes(userId)) return;
    await deleteDoc(doc(database, 'posts', postId, 'likes', userId));
  } catch (error) {
    console.log(error);
  }
}
