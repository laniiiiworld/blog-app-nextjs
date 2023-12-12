'use client';

import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

type Props = {
  type: string;
  post: Post;
};

const ARROW_CSS = 'absolute top-0 bottom-0 my-auto text-5xl text-yellow-300';

export default function PostArrow({ type, post }: Props) {
  const { title, description, path } = post;

  return (
    <Link href={`/posts/${path}`} className='w-1/2 relative cursor-pointer'>
      <Image
        src={`/images/posts/${path}.png`}
        alt='title'
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: '208px' }}
      />
      <div className='absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center text-white transition-transform hover:scale-105'>
        <h2 className='font-semibold text-2xl'>{title}</h2>
        <p className='font-semibold mt-2'>{description}</p>
        {type === 'prev' && <FaArrowLeft className={`${ARROW_CSS} left-0 ml-8`} />}
        {type === 'next' && <FaArrowRight className={`${ARROW_CSS} right-0 mr-8`} />}
      </div>
    </Link>
  );
}
