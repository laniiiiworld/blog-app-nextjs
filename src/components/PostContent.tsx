'use client';

import { FullPostData } from '@/model/post';
import MarkdownViewr from '@/components/MarkdownViewr';
import { useAuthContext } from '@/context/AuthContext';
import { usePopUpContext } from '@/context/PopUpContext';
import { useLikesContext } from '@/context/LikesContext';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/HeartFillIcon';
import HeartIcon from './ui/HeartIcon';
import { forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import PostDeletePopup from './popup/PostDeletePopup';
import { formatToISODate } from '@/util/date';
import ThumbnailImage from './ThumbnailImage';
import PostTagList from './PostTagList';

type Props = {
  post: FullPostData;
};

const PostContent = forwardRef<HTMLElement | null, Props>(({ post }, ref) => {
  const router = useRouter();
  const { id, path, title, description, createdAt, content, thumbnail, tags } = post;
  const { user } = useAuthContext();
  const { setPopupType } = usePopUpContext();
  const { likes, liked, updateLikes } = useLikesContext();
  const handleLikesClick = (updated: boolean) => {
    if (!user?.uid) {
      setPopupType('login');
      return;
    }
    updateLikes(updated);
  };

  return (
    <>
      <PostDeletePopup postId={id} path={path} />
      <section ref={ref} className='py-4'>
        <PostTagList path={path} tags={tags} />
        <h1 className='text-4xl font-bold my-6 text-center'>{title}</h1>
        <div className='relative flex justify-center items-center mt-6 mb-8 lg:mb-12'>
          <p className='text-center'>{formatToISODate(createdAt)}</p>
          <div className='absolute right-0 flex gap-2'>
            {user?.isAdmin && (
              <>
                <button onClick={() => router.push(`/write/${path}`)} className='text-gray-500 text-sm hover:underline'>
                  수정
                </button>
                <button onClick={() => setPopupType('confirm')} className='text-gray-500 text-sm hover:underline'>
                  삭제
                </button>
              </>
            )}
            <ToggleButton
              toggled={liked}
              onToggle={handleLikesClick}
              onIcon={<HeartFillIcon />}
              offIcon={<HeartIcon />}
              ToggleClass='lg:hidden flex mr-4 px-2 py-1 text-lg rounded-xl'
            >
              <span className='text-light text-sm pl-1'>{likes?.length}</span>
            </ToggleButton>
          </div>
        </div>
        {thumbnail && (
          <ThumbnailImage
            type='page'
            postId={post.id}
            thumbnail={post.thumbnail}
            width={760}
            height={420}
            title={post.title}
            isPriority={true}
          />
        )}
        <p className='pt-2 mb-4 text-xl font-semibold'>{description}</p>
        <div className='w-44 h-1 bg-green-800 mt-2 mb-4'></div>
        <MarkdownViewr content={content} />
      </section>
    </>
  );
});

PostContent.displayName = 'PostContent';
export default PostContent;
