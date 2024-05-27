'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Props = {
  path: string;
};

export function useLikes({ path }: Props) {
  const queryClient = useQueryClient();
  const {
    data: { likes },
    isLoading,
    isError,
  } = useQuery<{ likes: string[] }, Error>({
    queryKey: ['posts', path, 'likes'],
    queryFn: () =>
      fetch(`/api/posts/${path}/likes`, {
        method: 'GET',
      }).then((res) => res.json()),
    initialData: { likes: [] },
  });

  const updateLikes = useMutation({
    mutationFn: ({ postId, userId, like }: { postId: string; userId: string; like: boolean }) =>
      fetch(`/api/posts/${path}/likes`, {
        method: 'PUT',
        body: JSON.stringify({ postId, userId, like }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path, 'likes'] }),
  });

  return { likes, isLoading, isError, updateLikes };
}
