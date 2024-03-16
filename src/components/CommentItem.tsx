'use client';

import Image from 'next/image';
import { usePopUpContext } from '@/context/PopUpContext';
import { Comment } from './Comments';
import CommentForm from './CommentForm';
import { useCommentsContext } from '@/context/CommentsContext';
import { useAuthContext } from '@/context/AuthContext';
import { formatAgo } from '../util/date';
import PopUp from './popup/PopUp';

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  const { user } = useAuthContext();
  const { edited, setEdited, removeComment } = useCommentsContext();
  const { setIsShow, value: deleted, setValue: setDeleted } = usePopUpContext();

  return (
    <>
      <PopUp
        handleConfirm={() => {
          removeComment(deleted);
          setDeleted('');
        }}
        width={'w-80'}
      >
        <>
          <h3 className='text-xl font-semibold'>댓글 삭제</h3>
          <span>댓글을 정말로 삭제하시겠습니까?</span>
        </>
      </PopUp>
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
                  setIsShow(true);
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
        {edited && <CommentForm commentId={comment.id} text={comment.content} />}
      </li>
    </>
  );
}
