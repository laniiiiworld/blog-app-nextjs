import { FullPostData } from '@/model/post';
import Image from 'next/image';

type Props = {
  post: FullPostData;
  width: number;
  height: number;
};

export default function PostPageImage({ post, width, height }: Props) {
  const { path, title } = post;

  return (
    <>
      <Image
        className='w-full h-1/6 max-h-[450px] object-cover rounded-xl my-6'
        src={`/images/posts/${path}.png`} //
        alt={title}
        width={width}
        height={height}
        priority={true}
      />
    </>
  );
}
