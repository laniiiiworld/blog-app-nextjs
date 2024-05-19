'use client';

import Tags from '@/components/Tags';
import PostsGrid from '@/components/PostsGrid';
import usePosts from '@/hooks/usePosts';
import { useSearchParams } from 'next/navigation';

export const SELECT_ALL = 'All Posts';
import DotFalling from './loading/DotFalling';

export default function FilterablePosts() {
  const params = useSearchParams();
  const selected = params.get('tag') || SELECT_ALL;
  const {
    postsQuery: { isLoading, data: posts = [] },
    getTags,
  } = usePosts();
  const tags = getTags(posts);
  const filtered =
    selected === SELECT_ALL //
      ? posts
      : posts.filter((post) => post.tags.includes(selected));

  return (
    <section className='flex mt-4 md:mt-12 flex-col md:flex-row'>
      <aside className='grow md:basis-1/6 md:text-center p-4'>
        <Tags //
          tags={tags}
          selected={selected}
        />
      </aside>
      <section className='grow md:basis-5/6'>
        {!isLoading && <PostsGrid posts={filtered} />}
        {isLoading && <DotFalling />}
      </section>
    </section>
  );
}
