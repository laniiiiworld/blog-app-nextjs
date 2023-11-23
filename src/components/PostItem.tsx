import { Post } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  const { title, description, date, category, path } = post;

  return (
    <Link
      href={`/posts/${path}`}
      className='rounded-md overflow-hidden shadow-md cursor-pointer w-80 hover:bg-yellow-50'
    >
      <Image src={`/images/posts/${path}.png`} alt={title} width={350} height={300} />
      <div className='p-2 mb-3 text-center leading-relaxed'>
        <p className='text-right text-light text-sm'>{date}</p>
        <h2 className='font-semibold'>{title}</h2>
        <p className='line-clamp-2'>{description}</p>
        <span className='text-xs bg-blue-200 rounded-md px-2 py-1'>{category}</span>
      </div>
    </Link>
  );
}
