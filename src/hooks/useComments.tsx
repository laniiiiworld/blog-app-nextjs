'use client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPostComments, addPostComment, updatePostComment, removePostComment } from '@/app/api/posts';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '@/model/post';
import { useAuthContext } from '@/context/AuthContext';

export default function useComments(postId: string) {
  const queryClient = useQueryClient();
  const commentQuery = useQuery<Comment[], Error>({
    queryKey: ['comments', postId || ''],
    queryFn: () => getPostComments(postId || ''),
  });
  const { user } = useAuthContext();

  const addComment = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      if (!user) throw new Error('fail...');
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
      await addPostComment(postId, comment, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] });
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ postId, comment }: { postId: string; comment: Comment }) => {
      if (!user) throw new Error('fail...');
      await updatePostComment(postId, comment, user);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] }),
  });

  const removeComment = useMutation({
    mutationFn: async ({ postId, commentId }: { postId: string; commentId: string }) =>
      await removePostComment(postId, commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', postId || ''] }),
  });

  return { commentQuery, addComment, updateComment, removeComment };
}
