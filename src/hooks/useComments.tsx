'use client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPostComments, addPostComment } from '@/app/api/firebase';
import { Comment } from '@/components/Comments';

export default function useComments(postId: string) {
  const queryClient = useQueryClient();
  const commentQuery = useQuery<Comment[], Error>({
    queryKey: ['comments', postId || ''],
    queryFn: () => getPostComments(postId || ''),
  });

  const addComment = useMutation({
    mutationFn: async ({ postId, comment }: { postId: string; comment: Comment }) => {
      await addPostComment(postId, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] });
    },
  });

  return { commentQuery, addComment };
}
