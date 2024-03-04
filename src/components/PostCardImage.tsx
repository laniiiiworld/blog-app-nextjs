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
  const [isImage, setIsImage] = useState(post.isImage);

  return (
    <div className={`relative w-full aspect-video bg-black`}>
      {isImage && (
        <Image //
          className='w-full h-full'
          src={`/images/posts/${path}.png`}
          alt={title}
          width={width}
          height={height}
          onError={() => setIsImage(false)}
        />
      )}
      {!isImage && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 text-white`}>
          <h3 className='font-semibold text-2xl text-center'>{title}</h3>
        </div>
      )}
    </div>
  );
}
