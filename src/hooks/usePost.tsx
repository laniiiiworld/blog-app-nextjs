'use client';
import { useAuthContext } from '@/context/AuthContext';
import { FullPostData, PostFormData, PostWithAdjacents } from '@/model/post';
import { formatDateTime24HH } from '@/util/date';
import { createPostFormData, fetchWithAuth } from '@/util/fetch';
import { makePostPath } from '@/util/parse';
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
    ({ postId, postPath }: { postId: string; postPath: string }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'desc'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postPath] });
      queryClient.invalidateQueries({ queryKey: ['thumbnail', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts', 'saved'] });
    },
    [queryClient]
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
    enabled: path !== 'SAVEDPOSTS' && enabled,
  });

  const {
    data: savedPosts = [],
    isLoading: isSavedLoading,
    isError: isSavedError,
  } = useQuery<FullPostData[], Error>({
    queryKey: ['posts', 'saved'],
    queryFn: () =>
      fetch('/api/saved', {
        method: 'GET',
      }).then((res) => res.json()),
    enabled: path === 'SAVEDPOSTS' && enabled,
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
        path: rest.path || makePostPath(rest.title),
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
      ).then(() => ({ postId: post.id, postPath: post.path }));
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
        [`${rest.postType === 'saved' ? 'createdAt' : 'lastUpdatedAt'}`]: formatDateTime24HH(),
      };

      return fetchWithAuth(
        `/api/posts/${path}`,
        {
          method: 'PUT',
          body: createPostFormData(post, thumbnail),
        },
        'Failed to update post'
      ).then(() => ({ postId: post.id, postPath: post.path }));
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
      ).then(() => ({ postId, postPath: path })),
    onSuccess,
  });

  return {
    post,
    prevPost,
    nextPost,
    isLoading,
    isError,
    savedPosts,
    isSavedLoading,
    isSavedError,
    addPost,
    updatePost,
    removePost,
  };
}
