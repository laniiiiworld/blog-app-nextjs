'use client';
import { FullPostData } from '@/model/post';
import { useQuery } from '@tanstack/react-query';

type Props = {
  path: string;
};

export function usePost({ path }: Props) {
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<FullPostData, Error>({
    queryKey: ['posts', path],
    queryFn: () =>
      fetch(`/api/posts/${path}`, {
        method: 'GET',
      }).then((res) => res.json()),
    staleTime: 1000 * 60,
  });

  return { post, isLoading, isError, error };
}
