'use client';
import { PostCardData } from '@/model/post';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/app/api/posts';

export default function usePosts() {
  const postsQuery = useQuery<PostCardData[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60,
  });

  return { postsQuery };
}
