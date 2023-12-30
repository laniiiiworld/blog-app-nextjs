import path from 'path';
import { promises } from 'fs';
import { SELECT_ALL } from '@/components/FilterablePosts';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
  findIndex: number;
};

export type PostData = Post & { content: string };

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await promises.readFile(filePath, 'utf-8');
  return (<Post[]>JSON.parse(data)).sort(
    (a, b) => Number(b.date.replaceAll('-', '')) - Number(a.date.replaceAll('-', ''))
  );
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}

export async function getNoneFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !post.featured);
}

export async function getPostContent(fileName: string) {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const content = await promises.readFile(filePath, 'utf-8');
  return content;
}

export async function getPostData(fileName: string, index?: number): Promise<PostData> {
  const posts = await getAllPosts();
  if (!posts) throw new Error(`${fileName}에 해당하는 게시글을 찾을 수 없습니다.`);

  if (index !== undefined) {
    if (index < 0) return { ...posts[posts.length - 1], content: '', findIndex: posts.length - 1 };
    if (index >= posts.length) return { ...posts[0], content: '', findIndex: 0 };
    return { ...posts[index], content: '', findIndex: index };
  }

  const findIndex = posts.findIndex((post) => post.path === fileName)!;
  const post = posts[findIndex];
  const content = await getPostContent(post.path);

  return { ...post, content, findIndex };
}

export async function getCategories(posts: Post[]): Promise<string[]> {
  const categories = new Set(posts.map((post) => post.category));
  return [SELECT_ALL, ...categories];
}
