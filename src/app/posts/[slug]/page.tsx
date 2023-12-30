import MarkdownViewr from '@/components/MarkdownViewr';
import PostArrow from '@/components/PostArrow';
import { getPostData } from '@/service/posts';
import Image from 'next/image';
import { FaRegCalendar } from 'react-icons/fa6';

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params: { slug } }: Props) {
  const { title, description, date, path, content, findIndex } = (await getPostData(slug))!;
  const prevPost = (await getPostData(slug, findIndex - 1))!;
  const nextPost = (await getPostData(slug, findIndex + 1))!;

  return (
    <article className='m-2 relative rounded-2xl overflow-hidden bg-slate-100 shadow-lg'>
      <Image
        className='w-full h-1/6 max-h-[450px] object-cover'
        src={`/images/posts/${path}.png`} //
        alt={title}
        width={760}
        height={420}
      />
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
      <section className='flex rounded-b-xl overflow-hidden'>
        <PostArrow type='prev' post={prevPost} />
        <PostArrow type='next' post={nextPost} />
      </section>
    </article>
  );
}
