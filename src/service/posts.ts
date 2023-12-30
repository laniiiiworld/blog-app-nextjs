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
  content?: string;
  findIndex: number;
};

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

export async function getPostContent(name: string) {
  const filePath = path.join(process.cwd(), 'data/posts', `${name}.md`);
  const data = await promises.readFile(filePath, 'utf-8');
  return data;
}

export async function getPost(path: string, index?: number): Promise<Post | undefined> {
  const data = await getAllPosts();

  if (index !== undefined) {
    if (index < 0) return { ...data[data.length - 1], findIndex: data.length - 1 };
    if (index >= data.length) return { ...data[0], findIndex: 0 };
    return { ...data[index], findIndex: index };
  }

  const findIndex = data.findIndex((post) => post.path === path)!;
  const post = data[findIndex];
  const content = await getPostContent(post.path);

  return { ...post, content, findIndex };
}

export async function getCategories(posts: Post[]): Promise<string[]> {
  const categories = new Set(posts.map((post) => post.category));
  return [SELECT_ALL, ...categories];
}
