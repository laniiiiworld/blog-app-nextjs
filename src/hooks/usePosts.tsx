'use client';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/app/api/posts';
import { Post } from '@/service/posts';
import { SELECT_ALL } from '@/components/FilterablePosts';

export default function usePosts() {
  const postsQuery = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60,
  });

  const getTags = (posts: Post[]): Map<string, number> => {
    const result = new Map();
    result.set(SELECT_ALL, posts.length);
    for (const { tags } of posts) {
      for (const tag of tags) {
        const count = result.get(tag) || 0;
        result.set(tag, count + 1);
      }
    }
    return result;
  };

  return { postsQuery, getTags };
}
