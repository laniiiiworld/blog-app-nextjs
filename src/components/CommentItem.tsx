'use client';

import Image from 'next/image';
import { CommentData } from '@/model/post';
import { usePopUpContext } from '@/context/PopUpContext';
import CommentForm from './CommentForm';
import { useCommentsContext } from '@/context/CommentsContext';
import { useAuthContext } from '@/context/AuthContext';
import { formatAgo } from '../util/date';
import CommentDeletePopup from './popup/CommentDeletePopup';

type Props = {
  comment: CommentData;
};

export default function CommentItem({ comment }: Props) {
  const { user } = useAuthContext();
  const { edited, setEdited } = useCommentsContext();
  const { setPopupType, setValue: setDeleted } = usePopUpContext();

  return (
    <>
      <CommentDeletePopup />
      <li className='border-b border-gray-200 py-6'>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <Image //
              src={comment.user.photoURL || ''}
              alt={comment.user.email || ''}
              width={45}
              height={45}
              className='rounded-full'
            />
            <div className='pl-4'>
              <div className='font-semibold'>{comment.user.displayName}</div>
              <div className='text-light text-sm'>{formatAgo(comment.createdAt)}</div>
            </div>
          </div>
          {user?.uid && user?.uid === comment.user.uid && (
            <div className='flex gap-2 text-gray-500 text-sm'>
              <button onClick={() => setEdited(comment.id)} className='hover:underline'>
                수정
              </button>
              <button
                onClick={() => {
                  setDeleted(comment.id);
                  setPopupType('confirm');
                }}
                className='hover:underline'
              >
                삭제
              </button>
            </div>
          )}
        </div>
        {(!edited || edited !== comment.id) && (
          <p className='w-full min-h-[7rem] mt-6 bg-white whitespace-pre-line'>{comment.content}</p>
        )}
        {edited && edited === comment.id && <CommentForm commentId={comment.id} text={comment.content} />}
      </li>
    </>
  );
}
