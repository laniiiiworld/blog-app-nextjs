'use client';

import Tags from '@/components/Tags';
import PostsGrid from '@/components/PostsGrid';
import { useSearchParams } from 'next/navigation';
import { useTags } from '@/hooks/useTags';
import { SELECT_ALL } from '@/service/tags';

export default function FilterablePosts() {
  const params = useSearchParams();
  const selected = params.get('tag') || SELECT_ALL;
  const { tags } = useTags({ initialData: new Map().set(SELECT_ALL, 0) });

  return (
    <section className='flex mt-4 md:mt-12 flex-col md:flex-row'>
      <aside className='grow md:basis-1/6 md:text-center p-4'>
        <Tags //
          tags={tags}
          selected={selected}
        />
      </aside>
      <section className='grow md:basis-5/6'>
        <PostsGrid tag={selected} />
      </section>
    </section>
  );
}
