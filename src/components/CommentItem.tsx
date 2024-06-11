'use client';

import { CommentData } from '@/model/post';
import { usePopUpContext } from '@/context/PopUpContext';
import { useCommentsContext } from '@/context/CommentsContext';
import { useAuthContext } from '@/context/AuthContext';
import CommentDeletePopup from './popup/CommentDeletePopup';
import CommentFormToUpdate from './CommentFormToUpdate';
import CommentUser from './CommentUser';

type Props = {
  comment: CommentData;
};

export default function CommentItem({ comment }: Props) {
  const { user } = useAuthContext();
  const { edited, setEdited } = useCommentsContext();
  const { setPopupType, setValue: setDeleted } = usePopUpContext();
  const isMyComment = user?.uid && user?.uid === comment.user.uid;
  const isEditing = edited && edited === comment.id;

  return (
    <>
      <CommentDeletePopup />
      <li className='border-b border-gray-200 py-6'>
        <div className='flex items-center justify-between'>
          <CommentUser size={45} user={comment.user} createdAt={comment.createdAt} />
          {isMyComment && (
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
        {!isEditing && <p className='w-full min-h-[7rem] mt-6 bg-white whitespace-pre-line'>{comment.content}</p>}
        {isEditing && <CommentFormToUpdate comment={comment} />}
      </li>
    </>
  );
}
