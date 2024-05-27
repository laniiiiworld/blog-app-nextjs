'use client';

import AdjacentPosts from '@/components/AdjacentPosts';
import AsideIcons from '@/components/AsideIcons';
import Comments from '@/components/Comments';
import PostContent from '@/components/PostContent';
import TableOfContents from '@/components/TableOfContents';
import Spinner from '@/components/loading/Spinner';
import TopButton from '@/components/ui/TopButton';
import { LikesContextProvider } from '@/context/LikesContext';
import { usePost } from '@/hooks/usePost';
import { notFound } from 'next/navigation';
import { useRef } from 'react';

type Props = {
  params: { slug: string };
};

export default function PostPage({ params: { slug } }: Props) {
  const { post, prevPost, nextPost, isLoading, isError } = usePost({ path: slug });
  const contentRef = useRef<HTMLElement | null>(null);

  if (isLoading || !post) return <Spinner />;
  if (isError) notFound();
  const { id, content } = post;

  return (
    <LikesContextProvider postId={id} path={slug}>
      <div className='w-full lg:basis-0 lg:grow-[4] lg:w-4/5 px-4 lg:px-8'>
        <PostContent post={post} ref={contentRef} />
        <AdjacentPosts prevPost={prevPost} nextPost={nextPost} />
        <Comments postId={id} />
      </div>
      <aside className='max-lg:hidden sticky top-20 2xl:top-36 left-0 pl-2 w-1/5 h-full basis-0 shrink-0 grow'>
        <AsideIcons />
        <TableOfContents content={content} contentRef={contentRef} />
      </aside>
      <TopButton />
    </LikesContextProvider>
  );
}
