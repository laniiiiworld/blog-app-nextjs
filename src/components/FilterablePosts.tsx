'use client';

import Tags from '@/components/Tags';
import PostsGrid from '@/components/PostsGrid';
import { Post } from '@/service/posts';
import { useState } from 'react';

type Props = {
  posts: Post[];
  tags: string[];
};

export const SELECT_ALL = 'All Posts';

export default function FilterablePosts({ posts, tags }: Props) {
  const [selected, setSelected] = useState(SELECT_ALL);
  const filtered =
    selected === SELECT_ALL //
      ? posts
      : posts.filter((post) => post.tag === selected);

  return (
    <section className='flex mt-12'>
      <aside className='grow basis-1/6 text-center p-4'>
        <Tags //
          tags={tags}
          selected={selected}
          onClick={setSelected}
        />
      </aside>
      <section className='grow basis-5/6'>
        <PostsGrid posts={filtered} />
      </section>
    </section>
  );
}
