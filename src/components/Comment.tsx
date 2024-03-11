'use client';

import Image from 'next/image';
import { usePopUpContext } from '@/context/PopUpContext';
import { Comment } from './Comments';
import PopUp from './PopUp';
import { useCommentsContext } from '@/context/CommentsContext';
import { useAuthContext } from '@/context/AuthContext';

type Props = {
  comment: Comment;
};

export default function Comment({ comment }: Props) {
  const { user } = useAuthContext();
  const { removeComment } = useCommentsContext();
  const { setIsShow, value: deleted, setValue: setDeleted } = usePopUpContext();

  return (
    <>
      <PopUp
        title='댓글 삭제'
        message='댓글을 정말로 삭제하시겠습니까?'
        handleConfirm={() => {
          removeComment(deleted);
          setDeleted('');
        }}
      />
      <li className='border-b border-gray-200 py-6'>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <Image //
              src={comment.user.photoURL}
              alt={comment.user.email}
              width={45}
              height={45}
              className='rounded-full'
            />
            <div className='pl-4'>
              <div className='font-semibold'>{comment.user.displayName}</div>
              <div className='text-light text-sm'>{comment.createdAt}</div>
            </div>
          </div>
          {user?.uid && user?.uid === comment.user.uid && (
            <div className='flex gap-2 text-gray-500 text-sm'>
              <button
                onClick={() => {
                  setDeleted(comment.id);
                  setIsShow(true);
                }}
                className='hover:underline'
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className='w-full min-h-[7rem] mt-6 bg-white whitespace-pre-line'>{comment.content}</p>
      </li>
    </>
  );
}
