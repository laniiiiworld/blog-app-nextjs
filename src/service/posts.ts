import path from 'path';
import { promises } from 'fs';
import { SELECT_ALL } from '@/components/FilterablePosts';
import { cache } from 'react';

export type Post = {
  title: string;
  description: string;
  date: string;
  tag: string;
  path: string;
  featured: boolean;
  isImage: boolean;
};

export type PostData = Post & {
  content: string;
  prevPost: Post | null;
  nextPost: Post | null;
};

//https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data
export const getAllPosts = cache(async () => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await promises.readFile(filePath, 'utf-8');
  return (<Post[]>JSON.parse(data)).sort(
    (a, b) => Number(b.date.replaceAll('-', '')) - Number(a.date.replaceAll('-', ''))
  );
});

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}

// You May Like
export async function getNoneFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !post.featured);
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const posts = await getAllPosts();
  const findIndex = posts.findIndex((post) => post.path === fileName);

  if (findIndex === -1) throw new Error(`${fileName}에 해당하는 게시글을 찾을 수 없습니다.`);

  const post = posts[findIndex];
  const content = await promises.readFile(filePath, 'utf-8');
  const prevPost = findIndex > 0 ? posts[findIndex - 1] : null;
  const nextPost = findIndex < posts.length - 1 ? posts[findIndex + 1] : null;

  return { ...post, content, prevPost, nextPost };
}

export function getTags(posts: Post[]): string[] {
  const tags = new Set(posts.map((post) => post.tag));
  return [SELECT_ALL, ...tags];
}
