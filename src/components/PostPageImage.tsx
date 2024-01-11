'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Post } from '@/service/posts';

type Props = {
  post: Post;
  width: number;
  height: number;
};

export default function PostCardImage({ post, width, height }: Props) {
  const { path, title } = post;
  const [isImage, setIsImage] = useState(true);

  return (
    <>
      {isImage && (
        <Image
          className='w-full h-1/6 max-h-[450px] object-cover'
          src={`/images/posts/${path}.png`} //
          alt={title}
          width={width}
          height={height}
          onError={() => setIsImage(false)}
        />
      )}
      {!isImage && (
        <div className='w-full h-[28rem] bg-black text-white'>
          <h3 className='font-bold text-4xl flex justify-center items-center h-full'>{title}</h3>
        </div>
      )}
    </>
  );
}
