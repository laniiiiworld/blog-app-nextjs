'use client';

import { FullPostData } from '@/model/post';
import PostPageImage from '@/components/PostPageImage';
import MarkdownViewr from '@/components/MarkdownViewr';
import { useAuthContext } from '@/context/AuthContext';
import { usePopUpContext } from '@/context/PopUpContext';
import { useLikesContext } from '@/context/LikesContext';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/HeartFillIcon';
import HeartIcon from './ui/HeartIcon';
import { forwardRef } from 'react';

type Props = {
  post: FullPostData;
};

const PostContent = forwardRef<HTMLElement | null, Props>(({ post }, ref) => {
  const { title, description, date, content, isImage } = post;
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
    <section ref={ref} className='py-4'>
      <h1 className='text-4xl font-bold mb-2 text-center'>{title}</h1>
      <div className='flex justify-center items-center mt-6 mb-8 lg:mb-12'>
        <p className='text-center'>{date}</p>
        <ToggleButton
          toggled={liked}
          onToggle={handleLikesClick}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
          ToggleClass='lg:hidden absolute right-0 flex mr-4 px-2 py-1 text-lg rounded-xl'
        >
          <span className='text-light text-sm pl-1'>{likes?.length}</span>
        </ToggleButton>
      </div>
      {isImage && <PostPageImage post={post} width={760} height={420} />}
      <p className='pt-2 mb-4 text-xl font-semibold'>{description}</p>
      <div className='w-44 h-1 bg-green-800 mt-2 mb-4'></div>
      <MarkdownViewr content={content} />
    </section>
  );
});

PostContent.displayName = 'PostContent';
export default PostContent;
