'use client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPostComments, addPostComment, updatePostComment, removePostComment } from '@/app/api/firebase';
import { User, Comment } from '@/components/Comments';
import { v4 as uuidv4 } from 'uuid';

export default function useComments(postId: string) {
  const queryClient = useQueryClient();
  const commentQuery = useQuery<Comment[], Error>({
    queryKey: ['comments', postId || ''],
    queryFn: () => getPostComments(postId || ''),
  });

  const addComment = useMutation({
    mutationFn: async ({ postId, content, user }: { postId: string; content: string; user: User }) => {
      const comment: Comment = {
        postId,
        id: uuidv4(),
        content,
        createdAt: new Date().toLocaleDateString('ko', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        user,
      };
      await addPostComment(postId, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] });
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ postId, comment }: { postId: string; comment: Comment }) =>
      await updatePostComment(postId, comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] }),
  });

  const removeComment = useMutation({
    mutationFn: async ({ postId, commentId }: { postId: string; commentId: string }) =>
      await removePostComment(postId, commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] }),
  });

  return { commentQuery, addComment, updateComment, removeComment };
}
