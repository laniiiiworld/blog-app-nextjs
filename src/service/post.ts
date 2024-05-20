import path from 'path';
import { promises } from 'fs';
import { FullPostData } from '@/model/post';
import { getAllPosts } from './posts';

export async function getPost(path: string): Promise<FullPostData | null> {
  try {
    const posts = await getAllPosts({ order: 'desc', tag: null });
    const findIndex = posts.findIndex((post) => post.path === path);

    if (findIndex === -1) throw new Error(`${path}에 해당하는 게시글을 찾을 수 없습니다.`);

    const post = posts[findIndex];
    const prevPost = findIndex > 0 ? posts[findIndex - 1] : null;
    const nextPost = findIndex < posts.length - 1 ? posts[findIndex + 1] : null;
    return {
      ...post,
      content: await getPostContent(path),
      prevPost: prevPost ? { title: prevPost.title, path: prevPost.path, isImage: prevPost.isImage } : null,
      nextPost: nextPost ? { title: nextPost.title, path: nextPost.path, isImage: nextPost.isImage } : null,
    };
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
