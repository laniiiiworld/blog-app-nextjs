'use client';

import { useState } from 'react';
import PostsGrid from '@/components/PostsGrid';
import { Order, OrderItem } from '@/hooks/usePosts';
import { PostCardData } from '@/model/post';

export const orders: OrderItem[] = [
  { key: 'desc', name: '최신순' },
  { key: 'asc', name: '오래된순' },
  { key: 'name', name: '이름순' },
];

export default function AllPosts() {
  const [selected, setSelected] = useState<Order>('desc');

  return (
    <section>
      <ul className='flex gap-4 justify-end pr-4 text-light text-sm'>
        {orders.map(({ key, name }) => (
          <li
            key={key}
            onClick={() => setSelected(key)}
            className={`cursor-pointer ${
              key === selected ? 'text-hover font-semibold' : 'hover:underline focus:underline'
            }`}
          >
            {name}
          </li>
        ))}
      </ul>
      <PostsGrid order={selected} />
    </section>
  );
}
