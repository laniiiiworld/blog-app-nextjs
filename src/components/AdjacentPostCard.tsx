'use client';

import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

type Props = {
  type: 'prev' | 'next';
  post: Post;
};

const ARROW_CLASS = 'text-5xl m-4 text-yellow-300 transition-all group-hover:text-6xl';

export default function AdjacentPostCard({ type, post }: Props) {
  const { title, description, path } = post;

  return (
    <Link href={`/posts/${path}`} className='relative w-full max-h-56 bg-black cursor-pointer'>
      <Image //
        className='w-full object-cover opacity-40'
        src={`/images/posts/${path}.png`}
        alt='title'
        width={750}
        height={350}
      />
      <div className='group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center text-white transition-transform px-8'>
        {type === 'prev' && <FaArrowLeft className={ARROW_CLASS} />}
        <div className='w-full text-center'>
          <h3 className='font-semibold text-2xl'>{title}</h3>
          <p className='font-semibold mt-2'>{description}</p>
        </div>
        {type === 'next' && <FaArrowRight className={ARROW_CLASS} />}
      </div>
    </Link>
  );
}
