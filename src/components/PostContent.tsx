import PostPageImage from '@/components/PostPageImage';
import MarkdownViewr from '@/components/MarkdownViewr';
import { PostData } from '@/service/posts';
import { FaRegCalendar } from 'react-icons/fa6';

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, description, date, content, isImage } = post;

  return (
    <section className='p-4'>
      <div className='flex items-center justify-end text-green-800 font-semibold text-sm'>
        <FaRegCalendar />
        <p className='ml-1'>{date}</p>
      </div>
      <h1 className='text-4xl font-bold mb-2'>{title}</h1>
      {isImage && <PostPageImage post={post} width={760} height={420} />}
      <p className='pt-2 mb-4 text-xl font-semibold'>{description}</p>
      <div className='w-44 h-1 bg-green-800 mt-2 mb-4'></div>
      <MarkdownViewr content={content} />
    </section>
  );
}
