'use client';
import { FullPostData, PostFormData, PostWithAdjacents } from '@/model/post';
import { getIdTokenAsync } from '@/service/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  path: string;
  enabled?: boolean;
};

export function usePost({ path, enabled = true }: Props) {
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
    mutationFn: async ({ form, tags }: { form: PostFormData; tags: string[] }) => {
      const post: FullPostData = {
        ...form,
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

  return { post, prevPost, nextPost, isLoading, isError, addPost };
}
