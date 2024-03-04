'use client';
import PostsGrid from '@/components/PostsGrid';
import { Post } from '@/service/posts';
import { useEffect, useState } from 'react';

type Props = {
  posts: Post[];
};
type Order = 'ASC' | 'DESC' | 'NAME';
type OrderItem = { key: Order; name: string };
const orders: OrderItem[] = [
  { key: 'DESC', name: '최신순' },
  { key: 'ASC', name: '오래된순' },
  { key: 'NAME', name: '이름순' },
];

export default function AllPosts({ posts }: Props) {
  const [selected, setSelected] = useState<Order>('DESC');
  let sorted = sortPosts(posts, selected);

  useEffect(() => {
    sorted = sortPosts(posts, selected);
  }, [selected]);

  return (
    <section>
      <ul className='flex gap-4 justify-end pr-4 text-slate-700 text-sm'>
        {orders.map(({ key, name }) => (
          <li
            key={key}
            onClick={() => setSelected(key)}
            className={`cursor-pointer ${
              key === selected ? 'text-hover font-semibold' : 'hover:underline'
            } focus:text-hover`}
          >
            {name}
          </li>
        ))}
      </ul>
      <PostsGrid posts={sorted} />
    </section>
  );
}

function sortPosts(posts: Post[], selected: Order) {
  if (selected === 'NAME') return posts.sort((a, b) => sortTitle(a, b));
  return posts.sort((a, b) => {
    const date1 = parseInt(a.date.replaceAll('-', ''));
    const date2 = parseInt(b.date.replaceAll('-', ''));
    if (date1 === date2) return sortTitle(a, b);
    return selected === 'ASC' ? date1 - date2 : date2 - date1;
  });
}

function sortTitle(a: Post, b: Post) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}
