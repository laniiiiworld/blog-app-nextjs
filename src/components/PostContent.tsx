import MarkdownViewr from '@/components/MarkdownViewr';
import { PostData } from '@/service/posts';
import { FaRegCalendar } from 'react-icons/fa6';

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, description, date, content } = post;

  return (
    <section className='p-4'>
      <div className='flex items-center justify-end text-sky-600 font-semibold text-sm'>
        <FaRegCalendar />
        <p className='ml-1'>{date}</p>
      </div>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='pt-2 mb-4 text-xl font-semibold'>{description}</p>
      <div className='w-44 h-1 bg-sky-600 mt-2'></div>
      <MarkdownViewr content={content} />
    </section>
  );
}
