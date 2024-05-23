'use client';

import AdjacentPostCard from '@/components/AdjacentPostCard';
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
  const { post, isLoading, isError } = usePost({ path: slug });
  const contentRef = useRef<HTMLElement | null>(null);

  if (isLoading) return <Spinner />;
  if (isError || !post) notFound();
  const { id, content, prevPost, nextPost } = post;

  return (
    <LikesContextProvider postId={id}>
      <div className='w-full lg:basis-0 lg:grow-[4] lg:w-4/5 px-4 lg:px-8'>
        <PostContent post={post} ref={contentRef} />
        <section className='overflow-hidden flex flex-col md:flex-row'>
          {prevPost && <AdjacentPostCard type='prev' post={prevPost} />}
          {nextPost && <AdjacentPostCard type='next' post={nextPost} />}
        </section>
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
