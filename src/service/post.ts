import path from 'path';
import { promises } from 'fs';
import { getAllPosts } from './posts';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { firebaseDB } from './firebase';
import { AdjacentPostData, FullPostData, PostWithAdjacents } from '@/model/post';

export async function getPostWithAdjacents(path: string): Promise<PostWithAdjacents | null> {
  try {
    const post = await getPost(path);

    if (!post) return null;

    const prevPostPromise = getAdjacentPost(post.id, post.date, true);
    const nextPostPromise = getAdjacentPost(post.id, post.date, false);
    const [prevPost, nextPost] = await Promise.all([prevPostPromise, nextPostPromise]);

    return { post, prevPost, nextPost };
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getPost(path: string): Promise<FullPostData | null> {
  try {
    const posts = await getAllPosts({ order: 'desc', tag: null });
    const findIndex = posts.findIndex((post) => post.path === path);

    if (findIndex === -1) throw new Error(`${path}에 해당하는 게시글을 찾을 수 없습니다.`);

    const post = posts[findIndex];
    const content = await getPostContent(path);
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
