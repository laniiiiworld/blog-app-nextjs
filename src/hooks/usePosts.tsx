'use client';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/app/api/firebase';
import { Post } from '@/service/posts';
import { SELECT_ALL } from '@/components/FilterablePosts';

export default function usePosts() {
  const postsQuery = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60,
  });

  const getTags = (posts: Post[]): Map<string, number> => {
    const tags = new Map();
    tags.set(SELECT_ALL, posts.length);
    for (const { tag } of posts) {
      const count = tags.get(tag) || 0;
      tags.set(tag, count + 1);
    }
    return tags;
  };

  return { postsQuery, getTags };
}
