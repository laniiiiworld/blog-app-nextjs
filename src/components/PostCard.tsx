import Link from 'next/link';
import PostCardImage from './PostCardImage';
import { FaRegCommentAlt } from 'react-icons/fa';
import { PiHeartFill } from 'react-icons/pi';
import { useLikesContext } from '@/context/LikesContext';
import { PostCardData } from '@/model/post';

type Props = {
  post: PostCardData;
};

export default function PostCard({ post }: Props) {
  const { title, date, tags, path, repliesCount } = post;
  const { likes } = useLikesContext();

  return (
    <Link href={`/posts/${path}`} legacyBehavior>
      <article className='rounded-md cursor-pointer p-4 border-2 border-transparent hover:border-hover hover:-translate-y-2 transition-transform duration-300 select-none'>
        <PostCardImage post={post} width={400} height={300} />
        <div className='h-36 flex flex-col items-start p-2 pb-0 mb-4'>
          <div className='flex gap-2 items-center w-full text-light text-sm'>
            <span className='flex items-center'>
              <PiHeartFill className='text-lg mr-1' /> {likes?.length}
            </span>
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
                  <Link
                    href={{
                      pathname: '/posts',
                      query: { tag },
                    }}
                    className='text-xs bg-blue-200 rounded-md px-2 py-1 hover:brightness-105'
                  >
                    {tag}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}
