'use client';

import Tags from '@/components/Tags';
import PostsGrid from '@/components/PostsGrid';
import { Post } from '@/service/posts';
import { useState } from 'react';

type Props = {
  posts: Post[];
  tags: Map<string, number>;
};

export const SELECT_ALL = 'All Posts';

export default function FilterablePosts({ posts, tags }: Props) {
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
        <PostsGrid posts={filtered} />
      </section>
    </section>
  );
}
