import { useThumbnail } from '@/hooks/useThumbnail';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  postId: string;
  prevThumbnail: string;
  imageFile?: File;
};

export default function BackgroundThumbnail({ children, postId, prevThumbnail, imageFile }: Props) {
  const { imageUrl } = useThumbnail(postId, prevThumbnail);

  return (
    <div
      className='flex justify-center items-center w-full aspect-video bg-gray-100 bg-cover bg-center rounded-md overflow-hidden'
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : imageFile && `url(${URL.createObjectURL(imageFile)})`,
      }}
    >
      {children}
    </div>
  );
}
