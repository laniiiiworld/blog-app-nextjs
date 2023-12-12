import MarkdownViewr from '@/components/MarkdownViewr';
import PostArrow from '@/components/PostArrow';
import { getPost } from '@/service/posts';
import Image from 'next/image';
import { FaRegCalendar } from 'react-icons/fa6';

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params: { slug } }: Props) {
  const { title, description, date, path, content = '', findIndex } = (await getPost(slug))!;
  const prevPost = (await getPost(slug, findIndex - 1))!;
  const nextPost = (await getPost(slug, findIndex + 1))!;

  return (
    <article className='mt-2 relative'>
      <Image
        src={`/images/posts/${path}.png`} //
        alt={title}
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: '250px' }}
        className='rounded-t-xl'
      />
      <section className='bg-slate-100 p-4'>
        <p className='flex items-center justify-end text-sky-600 font-semibold text-sm'>
          <FaRegCalendar className='mr-1' />
          {date}
        </p>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='pt-2 mb-4 font-semibold after:block after:content-[""] after:w-36 after:h-1 after:bg-sky-600 after:mt-2'>
          {description}
        </p>
        <MarkdownViewr content={content} />
      </section>
      <section className='flex rounded-b-xl overflow-hidden'>
        <PostArrow type='prev' post={prevPost} />
        <PostArrow type='next' post={nextPost} />
      </section>
    </article>
  );
}
