'use client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { CommentData, SimpleCommentData } from '@/model/post';
import { getIdTokenAsync } from '@/service/auth';

export default function useComments(postId: string, path: string) {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<CommentData[], Error>({
    queryKey: ['posts', path, 'comments'],
    queryFn: () =>
      fetch(`/api/posts/${path}/comments`, {
        method: 'GET',
      }).then((res) => res.json()),
    initialData: [],
  });

  const addComment = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      const token = await getIdTokenAsync();
      const comment: SimpleCommentData = {
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
      };
      return fetch(`/api/posts/${path}/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, comment }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path, 'comments'] }),
  });

  const updateComment = useMutation({
    mutationFn: async ({ comment }: { comment: CommentData }) => {
      const token = await getIdTokenAsync();
      return fetch(`/api/posts/${path}/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId, comment }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path, 'comments'] }),
  });

  const removeComment = useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const token = await getIdTokenAsync();
      return fetch(`/api/posts/${path}/comments`, {
        method: 'DELETE',
        body: JSON.stringify({ postId, commentId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path, 'comments'] }),
  });

  return { comments, isLoading, isError, addComment, updateComment, removeComment };
}
