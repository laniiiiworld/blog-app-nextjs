import { Post } from '@/service/posts';
import Link from 'next/link';
import PostCardImage from './PostCardImage';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { title, description, date, category, path } = post;
  return (
    <Link href={`/posts/${path}`}>
      <article className='rounded-md overflow-hidden shadow-md cursor-pointer hover:shadow-xl'>
        <PostCardImage post={post} width={300} height={200} />
        <div className='flex flex-col items-center p-2 mb-3 leading-relaxed'>
          <time className='self-end text-light text-sm'>{date}</time>
          <h3 className='text-lg font-semibold w-full truncate text-center'>{title}</h3>
          <p className='w-full truncate text-center'>{description}</p>
          <span className='text-xs bg-blue-200 rounded-md px-2 py-1'>{category}</span>
        </div>
      </article>
    </Link>
  );
}
