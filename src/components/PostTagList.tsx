import { PostCardData } from '@/model/post';
import Link from 'next/link';

type Props = {
  path: PostCardData['path'];
  tags: PostCardData['tags'];
  textSize?: string;
};

export default function PostTagList({ path, tags, textSize = '' }: Props) {
  return (
    <ul className='flex gap-2 flex-wrap'>
      {tags.length &&
        tags.map((tag) => (
          <li key={`${path} ${tag}`}>
            <Link
              href={{
                pathname: '/posts',
                query: { tag },
              }}
              className={`${textSize} bg-blue-200 rounded-md px-2 py-1 hover:brightness-105`}
            >
              {tag}
            </Link>
          </li>
        ))}
    </ul>
  );
}
