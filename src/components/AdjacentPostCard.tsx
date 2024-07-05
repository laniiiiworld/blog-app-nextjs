import { AdjacentPostData } from '@/model/post';
import Link from 'next/link';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import ThumbnailImage from './ThumbnailImage';

type Props = {
  type: 'prev' | 'next';
  post: AdjacentPostData;
};

const ARROW_CLASS = 'text-5xl md:text-7xl m-4 text-yellow-300 transition-all';

export default function AdjacentPostCard({ type, post }: Props) {
  const { id, path, title, thumbnail } = post;

  return (
    <Link href={`/posts/${path}`} className='relative w-full h-32 md:h-48 bg-black cursor-pointer'>
      {thumbnail && (
        <ThumbnailImage type='adjacent' postId={id} thumbnail={thumbnail} width={750} height={350} title={title} />
      )}
      <div className='group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center text-white transition-transform px-8'>
        {type === 'prev' && <FiArrowLeftCircle className={`${ARROW_CLASS} group-hover:animate-bounce-left`} />}
        <div className='w-full text-center'>
          <h3 className='font-semibold text-lg md:text-2xl'>{title}</h3>
        </div>
        {type === 'next' && <FiArrowRightCircle className={`${ARROW_CLASS} group-hover:animate-bounce-right`} />}
      </div>
    </Link>
  );
}
