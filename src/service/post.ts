import path from 'path';
import { promises } from 'fs';
import { firebaseDB } from './firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { AdjacentPostData, FullPostData, PostWithAdjacents } from '@/model/post';

export async function getPostWithAdjacents(path: string): Promise<PostWithAdjacents | null> {
  try {
    const post = await getPost(path);

    if (!post) return { post: null, prevPost: null, nextPost: null };

    const prevPostPromise = getAdjacentPost(post.id, post.date, true);
    const nextPostPromise = getAdjacentPost(post.id, post.date, false);
    const [prevPost, nextPost] = await Promise.all([prevPostPromise, nextPostPromise]);

    return { post, prevPost, nextPost };
  } catch (error) {
    console.log(error);
  }
  return { post: null, prevPost: null, nextPost: null };
}

export async function getPost(path: string): Promise<FullPostData | null> {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const postsPromise = getDocs(query(postsRef, where('path', '==', path)));
    const contentPromise = getPostContent(path);
    const [postsSnap, content] = await Promise.all([postsPromise, contentPromise]);
    const post = postsSnap.docs[0].data() as FullPostData;
    return { ...post, content };
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function getPostContent(fileName: string) {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const content = await promises.readFile(filePath, 'utf-8');
  return content;
}

async function getAdjacentPost(postId: string, date: string, isPrev: boolean) {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const postsQuery = query(postsRef, ...makeAdjacentPostsQuery(postId, date, isPrev));
    const data = await getDocs(postsQuery);
    return (data.docs[0]?.data() as AdjacentPostData) || null;
  } catch (error) {
    console.log(error);
  }
  return null;
}

function makeAdjacentPostsQuery(postId: string, date: string, isPrev: boolean) {
  return [
    orderBy('date', isPrev ? 'asc' : 'desc'), //
    orderBy('id', 'asc'),
    where('date', isPrev ? '>' : '<', date),
    where('id', '!=', postId),
    limit(1),
  ];
}

export async function getLikesCount(path: string) {
  try {
    const postQuery = query(collection(firebaseDB, 'posts'), where('path', '==', path));
    const postRef = (await getDocs(postQuery)).docs[0].ref;
    const likesRef = collection(postRef, 'likes');
    const likes = (await getDocs(likesRef)).docs.map((doc) => doc.id);
    return { likes };
  } catch (error) {
    console.log(error);
  }
  return { likes: [] };
}

export async function plusLikeCount(postId: string, userId: string) {
  try {
    await setDoc(doc(firebaseDB, 'posts', postId, 'likes', userId), { userId });
  } catch (error) {
    console.log(error);
  }
}

export async function minusLikeCount(postId: string, userId: string) {
  try {
    await deleteDoc(doc(firebaseDB, 'posts', postId, 'likes', userId));
  } catch (error) {
    console.log(error);
  }
}
