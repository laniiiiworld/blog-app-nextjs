'use client';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/app/api/firebase';
import { Post } from '@/service/posts';

export default function usePosts() {
  const postsQuery = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return { postsQuery };
}
