'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useCommentsContext } from '@/context/CommentsContext';
import { usePopUpContext } from '@/context/PopUpContext';
import LoginPopup from './popup/LoginPopup';
import useComments from '@/hooks/useComments';

export default function CommentFormToAdd() {
  const { user, logout } = useAuthContext();
  const { setPopupType } = usePopUpContext();
  const { postId, path } = useCommentsContext();
  const { comments, addComment } = useComments(postId, path);
  const [content, setContent] = useState('');
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.uid) {
      setPopupType('login');
      return;
    }

    addComment.mutate({ content });
    setContent('');
  };

  return (
    <>
      <LoginPopup />
      <h4 className='font-bold text-xl'>{comments?.length || 0}개의 댓글</h4>
      <form onSubmit={onSubmit}>
        <div className='flex my-4 gap-4'>
          {user && (
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
          <textarea
            name='content' //
            id='content'
            placeholder='댓글을 작성하세요'
            required={user ? true : false}
            value={content}
            onChange={onChange}
            className='resize-none outline-none border border-gray-200 w-full h-28 rounded-sm p-4'
          />
        </div>
        <div className='text-right'>
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
        </div>
      </form>
    </>
  );
}
