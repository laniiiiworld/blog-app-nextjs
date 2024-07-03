'use client';

import { FullPostData } from '@/model/post';
import { getPostImage } from '@/service/postImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  post: FullPostData;
  width: number;
  height: number;
};

export default function PostPageImage({ post, width, height }: Props) {
  const { id, title, thumbnail } = post;
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    thumbnail //
      ? getPostImage('thumbnail', id, thumbnail).then(setImageUrl)
      : setImageUrl('');
  }, [thumbnail, id]);

  return (
    <>
      {imageUrl && (
        <Image
          className='w-full h-1/6 max-h-[450px] object-cover rounded-xl my-6'
          src={imageUrl} //
          alt={title}
          width={width}
          height={height}
          priority={true}
        />
      )}
    </>
  );
}
