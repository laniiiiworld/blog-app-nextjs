'use client';

import PostPageImage from '@/components/PostPageImage';
import MarkdownViewr from '@/components/MarkdownViewr';
import { PostData } from '@/service/posts';
import { useEffect } from 'react';

type Props = {
  post: PostData;
};

export default function PostContent({ post }: Props) {
  const { title, description, date, content, isImage } = post;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className='p-4'>
      <h1 className='text-4xl font-bold mb-2 text-center'>{title}</h1>
      <p className='text-center mt-6 mb-12'>{date}</p>
      {isImage && <PostPageImage post={post} width={760} height={420} />}
      <p className='pt-2 mb-4 text-xl font-semibold'>{description}</p>
      <div className='w-44 h-1 bg-green-800 mt-2 mb-4'></div>
      <MarkdownViewr content={content} />
    </section>
  );
}
