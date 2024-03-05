import { Post } from '@/service/posts';
import Link from 'next/link';
import PostCardImage from './PostCardImage';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { title, date, tag, path } = post;
  return (
    <Link href={`/posts/${path}`}>
      <article className='rounded-md cursor-pointer p-4 border-2 border-transparent hover:border-hover hover:-translate-y-2 transition-transform duration-300 select-none'>
        <PostCardImage post={post} width={400} height={300} />
        <div className='h-32 flex flex-col items-start p-2 mb-3'>
          <time className='self-end text-light text-sm'>{date}</time>
          <span className='text-xs bg-blue-200 rounded-md px-2 py-1'>{tag}</span>
          <h3 className='text-xl leading-relaxed font-semibold w-full pt-2 pb-4'>{title}</h3>
        </div>
      </article>
    </Link>
  );
}
