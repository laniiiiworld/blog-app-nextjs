import path from 'path';
import { promises } from 'fs';
import { SELECT_ALL } from '@/components/FilteredPostList';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
  content?: string;
};

export async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await promises.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function getPostContent(name: string) {
  const filePath = path.join(process.cwd(), 'data/posts', `${name}.md`);
  const data = await promises.readFile(filePath, 'utf-8');
  return data;
}

export async function getPost(path: string): Promise<Post | undefined> {
  const data = await getPosts();
  const post = data.find((post) => post.path === path)!;
  const content = await getPostContent(post.path);
  return { ...post, content };
}

export async function getCategories(posts: Post[]): Promise<string[]> {
  const categories = new Set(posts.map((post) => post.category));
  return [SELECT_ALL, ...categories];
}
