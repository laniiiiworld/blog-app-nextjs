import { PostCardData } from '@/model/post';
import ThumbnailImage from './ThumbnailImage';

type Props = {
  post: PostCardData;
  width: number;
  height: number;
  isPriority: boolean;
};

export default function PostCardImage({ post, width, height, isPriority }: Props) {
  const { id, title, thumbnail } = post;

  return (
    <div className={`relative w-full aspect-video bg-black rounded-md overflow-hidden`}>
      <ThumbnailImage
        type='card'
        postId={id}
        thumbnail={thumbnail}
        width={width}
        height={height}
        title={title}
        isPriority={isPriority}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 text-white`}>
          <h3 className='font-semibold text-2xl text-center'>{title}</h3>
        </div>
      </ThumbnailImage>
    </div>
  );
}
