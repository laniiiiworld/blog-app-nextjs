import path from 'path';
import { promises } from 'fs';
import { cache } from 'react';
import { getPosts } from '@/app/api/posts';
import { FullPostData } from '@/model/post';

export const getAllPosts = cache(async () => {
  return await getPosts();
});

export async function getPostData(fileName: string): Promise<FullPostData> {
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
