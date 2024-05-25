'use client';
import { PostWithAdjacents } from '@/model/post';
import { useQuery } from '@tanstack/react-query';

type Props = {
  path: string;
};

export function usePost({ path }: Props) {
  const {
    data: { post, prevPost, nextPost },
    isLoading,
    isError,
    error,
  } = useQuery<PostWithAdjacents, Error>({
    queryKey: ['posts', path],
    queryFn: () =>
      fetch(`/api/posts/${path}`, {
        method: 'GET',
      }).then((res) => res.json()),
    initialData: { post: null, prevPost: null, nextPost: null },
  });

  return { post, prevPost, nextPost, isLoading, isError, error };
}
