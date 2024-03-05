'use client';

import Categories from '@/components/Categories';
import PostsGrid from '@/components/PostsGrid';
import { Post } from '@/service/posts';
import { useState } from 'react';

type Props = {
  posts: Post[];
  categories: string[];
};

export const SELECT_ALL = 'All Posts';

export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(SELECT_ALL);
  const filtered =
    selected === SELECT_ALL //
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <section className='flex mt-12'>
      <section className='grow basis-5/6'>
        <PostsGrid posts={filtered} />
      </section>
      <section className='grow basis-1/6 text-center p-4'>
        <Categories //
          categories={categories}
          selected={selected}
          onClick={setSelected}
        />
      </section>
    </section>
  );
}
