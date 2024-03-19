import path from 'path';
import { promises } from 'fs';
import { cache } from 'react';
import { getPosts } from '@/app/api/firebase';

export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  path: string;
  featured: boolean;
  isImage: boolean;
  repliesCount: number;
};

export type PostData = Post & {
  content: string;
  prevPost: Post | null;
  nextPost: Post | null;
};

export const getAllPosts = cache(async () => {
  return await getPosts();
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
