'use client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPostLikes, plusLikeCount, minusLikeCount } from '@/app/api/firebase';

export default function useLikes(postId: string, userId: string) {
  const queryClient = useQueryClient();
  const likesQuery = useQuery<string[], Error>({
    queryKey: ['likes', postId || ''],
    queryFn: () => getPostLikes(postId || ''),
    staleTime: 1000 * 60,
  });

  const likePost = useMutation({
    mutationFn: async () => {
      await plusLikeCount(postId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', postId || ''] });
    },
  });

  const dislikePost = useMutation({
    mutationFn: async () => await minusLikeCount(postId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['likes', postId || ''] }),
  });

  const updateLikes = (liked: boolean) => {
    return liked ? likePost.mutate() : dislikePost.mutate();
  };

  return { likesQuery, updateLikes };
}
