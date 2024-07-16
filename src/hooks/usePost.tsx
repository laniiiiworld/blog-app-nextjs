'use client';
import { useAuthContext } from '@/context/AuthContext';
import { FullPostData, PostFormData, PostWithAdjacents } from '@/model/post';
import { getIdTokenAsync } from '@/service/auth';
import { formatDateTime24HH } from '@/util/date';
import { createPostFormData, fetchWithAuth } from '@/util/fetch';
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
        createdAt: formatDateTime24HH(),
        writer: user?.uid || '',
      };

      return fetchWithAuth(
        `/api/posts/${post.path}`,
        {
          method: 'POST',
          body: createPostFormData(post, thumbnail),
        },
        'Failed to add post'
      ).then(() => post.id);
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
        lastUpdatedAt: formatDateTime24HH(),
      };

      return fetchWithAuth(
        `/api/posts/${path}`,
        {
          method: 'PUT',
          body: createPostFormData(post, thumbnail),
        },
        'Failed to update post'
      ).then(() => post.id);
    },
    onSuccess,
  });

  const removePost = useMutation({
    mutationFn: async ({ postId }: { postId: string }) =>
      fetchWithAuth(
        `/api/posts/${path}`,
        {
          method: 'DELETE',
          body: JSON.stringify({ postId }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        'Failed to remove post'
      ).then(() => postId),
    onSuccess,
  });

  return { post, prevPost, nextPost, isLoading, isError, addPost, updatePost, removePost };
}
