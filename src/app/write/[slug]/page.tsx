'use client';

import PostForm from '@/components/PostForm';
import Spinner from '@/components/loading/Spinner';
import { PostFormContextProvider } from '@/context/PostFormContext';
import { usePost } from '@/hooks/usePost';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default function UpdatePage({ params: { slug } }: Props) {
  const { post, isLoading, isError } = usePost({ path: slug });

  if (isLoading || !post) return <Spinner />;
  if (isError) notFound();

  return (
    <PostFormContextProvider post={post}>
      <PostForm isAdding={false} path={post.path} />
    </PostFormContextProvider>
  );
}
