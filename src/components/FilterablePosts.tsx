'use client';

import Tags from '@/components/Tags';
import PostsGrid from '@/components/PostsGrid';
import usePosts from '@/hooks/usePosts';
import { Post } from '@/service/posts';
import { useState } from 'react';
import Loading from './loading/Loading';

export const SELECT_ALL = 'All Posts';

export default function FilterablePosts() {
  const {
    postsQuery: { isLoading, data: posts = [] },
    getTags,
  } = usePosts();
  const tags = getTags(posts);
  const [selected, setSelected] = useState(SELECT_ALL);
  const filtered =
    selected === SELECT_ALL //
      ? posts
      : posts.filter((post) => post.tag === selected);

  return (
    <section className='flex mt-4 md:mt-12 flex-col md:flex-row'>
      <aside className='grow md:basis-1/6 md:text-center p-4'>
        <Tags //
          tags={tags}
          selected={selected}
          onClick={setSelected}
        />
      </aside>
      <section className='grow md:basis-5/6'>
        {isLoading && <Loading />}
        {!isLoading && <PostsGrid posts={filtered} />}
      </section>
    </section>
  );
}
