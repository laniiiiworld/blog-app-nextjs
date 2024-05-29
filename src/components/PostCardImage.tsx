'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PostCardData } from '@/model/post';

type Props = {
  post: PostCardData;
  width: number;
  height: number;
  isPriority: boolean;
};

export default function PostCardImage({ post, width, height, isPriority }: Props) {
  const { path, title } = post;
  const [isImage, setIsImage] = useState(post.isImage);

  return (
    <div className={`relative w-full aspect-video bg-black rounded-md overflow-hidden`}>
      {isImage && (
        <Image //
          className='w-full h-full pointer-events-none'
          src={`/images/posts/${path}.png`}
          alt={title}
          width={width}
          height={height}
          onError={() => setIsImage(false)}
          priority={isPriority}
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
