'use client';
import { getIdTokenAsync } from '@/service/auth';
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
    mutationFn: async ({ postId, like }: { postId: string; like: boolean }) => {
      const token = await getIdTokenAsync();
      return fetch(`/api/posts/${path}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, like }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path, 'likes'] }),
  });

  return { likes, isLoading, isError, updateLikes };
}
