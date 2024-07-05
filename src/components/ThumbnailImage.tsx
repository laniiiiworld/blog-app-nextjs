import { ReactNode } from 'react';
import Image from 'next/image';
import { useThumbnail } from '@/hooks/useThumbnail';

type Props = {
  type: 'card' | 'page' | 'adjacent';
  postId: string;
  title: string;
  thumbnail: string;
  width: number;
  height: number;
  isPriority?: boolean;
  children?: ReactNode;
};

const STYLE = {
  card: 'w-full h-full pointer-events-none',
  page: 'w-full object-cover h-1/6 max-h-[450px] rounded-xl my-6',
  adjacent: 'w-full object-cover opacity-40',
};

export default function ThumbnailImage({
  type,
  postId,
  thumbnail,
  width,
  height,
  title,
  isPriority = false,
  children,
}: Props) {
  const { imageUrl, isLoading, isError } = useThumbnail(postId, thumbnail);

  if (!imageUrl || isLoading || isError) return <>{children}</>;

  return (
    <Image //
      className={STYLE[type]}
      src={imageUrl}
      alt={title}
      width={width}
      height={height}
      priority={isPriority}
    />
  );
}
