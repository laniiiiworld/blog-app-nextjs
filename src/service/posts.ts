import { cache } from 'react';
import { getPosts } from '@/app/api/posts';

export const getAllPosts = cache(async () => {
  return await getPosts();
});
