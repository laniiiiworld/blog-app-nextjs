import { Post } from '@/service/posts';
import Link from 'next/link';
import PostCardImage from './PostCardImage';
import { FaRegCommentAlt } from 'react-icons/fa';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const { title, date, tags, path, repliesCount } = post;
  return (
    <Link href={`/posts/${path}`}>
      <article className='rounded-md cursor-pointer p-4 border-2 border-transparent hover:border-hover hover:-translate-y-2 transition-transform duration-300 select-none'>
        <PostCardImage post={post} width={400} height={300} />
        <div className='h-32 flex flex-col items-start p-2 pb-0 mb-4'>
          <div className='flex items-center w-full text-light text-sm'>
            <span className='flex items-center'>
              <FaRegCommentAlt className='mr-1' /> {repliesCount}
            </span>
            <time className='w-full text-right'>{date}</time>
          </div>
          <h3 className='text-xl leading-relaxed font-semibold w-full py-2'>{title}</h3>
          <ul className='flex gap-2 flex-wrap'>
            {tags.length &&
              tags.map((tag) => (
                <li key={`${path} ${tag}`}>
                  <span className='text-xs bg-blue-200 rounded-md px-2 py-1'>{tag}</span>
                </li>
              ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}
