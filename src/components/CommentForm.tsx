'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useCommentsContext } from '@/context/CommentsContext';
import { usePopUpContext } from '@/context/PopUpContext';
import LoginPopup from './popup/LoginPopup';
import useComments from '@/hooks/useComments';
import { CommentData } from '@/model/post';

type Props = {
  comment: CommentData | null;
};

export default function CommentForm({ comment }: Props) {
  const { user, logout } = useAuthContext();
  const { setPopupType } = usePopUpContext();
  const { postId, path, edited, setEdited } = useCommentsContext();
  const { comments, addComment, updateComment } = useComments(postId, path);

  const commentId = comment?.id;
  const [content, setContent] = useState(comment?.content || '');
  const isCreating = !commentId;
  const isUpdating = edited && edited === commentId;
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'content') {
      setContent(value);
    }
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.uid) {
      setPopupType('login');
      return;
    }
    if (!postId) return;

    if (!commentId) {
      addComment.mutate({ content });
    } else {
      updateComment.mutate({ comment: { ...comment, content } });
      setEdited('');
    }
    setContent('');
  };

  return (
    <>
      <LoginPopup />
      {isCreating && <h4 className='font-bold text-xl'>{comments?.length || 0}개의 댓글</h4>}
      <form onSubmit={onSubmit}>
        <div className='flex my-4 gap-4'>
          {isCreating && user && (
            <div>
              <Image //
                src={user.photoURL || ''}
                alt={user.email || ''}
                width={50}
                height={50}
                className='rounded-full'
              />
              <div className='font-semibold text-center'>{user.displayName}</div>
            </div>
          )}
          {(isCreating || isUpdating) && (
            <textarea
              name='content' //
              id='content'
              placeholder='댓글을 작성하세요'
              required={user ? true : false}
              value={content}
              onChange={onChange}
              className='resize-none outline-none border border-gray-200 w-full h-28 rounded-sm p-4'
            />
          )}
        </div>
        <div className='text-right'>
          {isCreating && (
            <>
              <button
                onClick={() => logout()}
                className={`${
                  !user && 'hidden'
                } bg-green-800 text-white rounded-sm px-4 py-2 mr-4 cursor-pointer hover:brightness-125`}
              >
                로그아웃
              </button>
              <input
                type='submit'
                value={user ? '댓글 작성' : '로그인'}
                className='bg-green-800 text-white rounded-sm px-4 py-2 cursor-pointer hover:brightness-125'
              />
            </>
          )}
          {isUpdating && (
            <>
              <button
                onClick={() => setEdited('')}
                className='bg-white text-green-800 rounded-sm px-4 py-2 mr-4 cursor-pointer hover:bg-gray-100'
              >
                취소
              </button>
              <input
                type='submit'
                value='댓글 수정'
                className='bg-green-800 text-white rounded-sm px-4 py-2 cursor-pointer hover:brightness-125'
              />
            </>
          )}
        </div>
      </form>
    </>
  );
}
