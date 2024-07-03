'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PostCardData } from '@/model/post';
import { getPostImage } from '@/service/postImage';

type Props = {
  post: PostCardData;
  width: number;
  height: number;
  isPriority: boolean;
};

export default function PostCardImage({ post, width, height, isPriority }: Props) {
  const { id, title, thumbnail } = post;
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    thumbnail //
      ? getPostImage('thumbnail', id, thumbnail).then(setImageUrl)
      : setImageUrl('');
  }, [thumbnail, id]);

  return (
    <div className={`relative w-full aspect-video bg-black rounded-md overflow-hidden`}>
      {imageUrl && (
        <Image //
          className='w-full h-full pointer-events-none'
          src={imageUrl}
          alt={title}
          width={width}
          height={height}
          priority={isPriority}
        />
      )}
      {!imageUrl && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 text-white`}>
          <h3 className='font-semibold text-2xl text-center'>{title}</h3>
        </div>
      )}
    </div>
  );
}
