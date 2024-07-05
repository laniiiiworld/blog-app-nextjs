'use client';
import { useAuthContext } from '@/context/AuthContext';
import { FullPostData, PostFormData, PostWithAdjacents } from '@/model/post';
import { getIdTokenAsync } from '@/service/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

type Props = {
  path: string;
  enabled?: boolean;
};

export function usePost({ path, enabled = true }: Props) {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const onSuccess = useCallback(
    (postId: string) => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'desc'] });
      queryClient.invalidateQueries({ queryKey: ['posts', path] });
      queryClient.invalidateQueries({ queryKey: ['thumbnail', postId] });
    },
    [queryClient, path]
  );
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
    mutationFn: async ({
      form: { newTag, ...rest },
      tags,
      thumbnail,
    }: {
      form: PostFormData;
      tags: string[];
      thumbnail?: File;
    }) => {
      const post: FullPostData = {
        ...rest,
        tags,
        createdAt: new Date().toLocaleDateString('ko', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        writer: user?.uid || '',
      };

      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      thumbnail && formData.append('thumbnail', thumbnail);

      const token = await getIdTokenAsync();
      const response = await fetch(`/api/posts/${post.path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add post');
      }
      return post.id;
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({
      form: { newTag, ...rest },
      tags,
      thumbnail,
    }: {
      form: PostFormData;
      tags: string[];
      thumbnail?: File;
    }) => {
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
      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      thumbnail && formData.append('thumbnail', thumbnail);

      const token = await getIdTokenAsync();
      const response = await fetch(`/api/posts/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }
      return post.id;
    },
    onSuccess,
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
      return postId;
    },
    onSuccess,
  });

  return { post, prevPost, nextPost, isLoading, isError, addPost, updatePost, removePost };
}
