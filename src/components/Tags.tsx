'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type Props = {
  tags: Map<string, number>;
  selected: string;
};

export default function Tags({ tags, selected }: Props) {
  useEffect(() => {
    const $tags = document.querySelector('.tags:not(.hidden)')!;
    const $tag = $tags.querySelector('.selected');
    $tag && $tag.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selected]);

  return (
    <>
      <h2 className='hidden md:block text-xl font-semibold border-b border-light pb-2 mb-4 select-none'>Tags</h2>
      <ul className='tags hidden md:block'>
        {[...tags.keys()].map((tag) => (
          <li key={tag}>
            <Link
              href={{
                pathname: '/posts',
                query: { tag },
              }}
              className={`cursor-pointer ${
                tag === selected ? 'text-hover font-semibold' : 'hover:underline focus:underline'
              }`}
            >
              {tag}
              <span className={`text-sm ${tag !== selected && 'text-light'}`}>{` (${tags.get(tag)})`}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className='tags md:hidden flex gap-2 overflow-x-auto py-4'>
        {[...tags.keys()].map((tag) => (
          <li key={tag} className={`${tag === selected && 'selected'}`}>
            <Link
              href={{
                pathname: '/posts',
                query: { tag },
              }}
              className={`cursor-pointer rounded-xl px-3 py-1 whitespace-nowrap ${
                tag === selected ? 'bg-hover text-white' : 'bg-slate-100'
              }`}
            >
              {tag}
              <span className={`text-sm ${tag !== selected && 'text-light'}`}>{` (${tags.get(tag)})`}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
