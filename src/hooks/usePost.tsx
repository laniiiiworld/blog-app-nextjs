'use client';
import { useAuthContext } from '@/context/AuthContext';
import { FullPostData, PostFormData, PostWithAdjacents } from '@/model/post';
import { getIdTokenAsync } from '@/service/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  path: string;
  enabled?: boolean;
};

export function usePost({ path, enabled = true }: Props) {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const {
    data: { post, prevPost, nextPost },
    isLoading,
    isError,
  } = useQuery<PostWithAdjacents, Error>({
    queryKey: ['posts', path],
    queryFn: () =>
      fetch(`/api/posts/${path}`, {
        method: 'GET',
      }).then((res) => res.json()),
    initialData: { post: null, prevPost: null, nextPost: null },
    enabled,
  });

  const addPost = useMutation({
    mutationFn: async ({ form: { newTag, ...rest }, tags }: { form: PostFormData; tags: string[] }) => {
      const post: FullPostData = {
        ...rest,
        tags,
        date: new Date().toLocaleDateString('ko', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        writer: user?.uid || '',
        id: uuidv4(),
      };
      const token = await getIdTokenAsync();
      const response = await fetch(`/api/posts/${post.path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add post');
      }
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ form: { newTag, ...rest }, tags }: { form: PostFormData; tags: string[] }) => {
      const post: FullPostData = {
        ...rest,
        tags,
        writer: user?.uid || '',
        lastUpdatedAt: new Date().toLocaleDateString('ko', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      };
      const token = await getIdTokenAsync();
      const response = await fetch(`/api/posts/${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path] }),
  });

  const removePost = useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      const token = await getIdTokenAsync();
      const response = await fetch(`/api/posts/${path}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove post');
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', path] }),
  });

  return { post, prevPost, nextPost, isLoading, isError, addPost, updatePost, removePost };
}
