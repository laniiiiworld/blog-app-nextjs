'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import useComments from '@/hooks/useComments';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './Comments';

type Props = {
  postId: string;
};

export default function CommentForm({ postId }: Props) {
  const { addComment } = useComments(postId);
  const { user, login, logout } = useAuthContext();
  const [content, setContent] = useState('');
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
      login();
      return;
    }
    if (!postId) return;

    const comment: Comment = {
      postId,
      id: uuidv4(),
      content,
      createdAt: new Date().toLocaleDateString('ko', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      user: {
        uid: user.uid,
        photoURL: user.photoURL || '',
        email: user.email || '',
        displayName: user.displayName || '',
      },
    };
    addComment.mutate({ postId, comment });
    setContent('');
  };

  return (
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
        {user && (
          <button
            onClick={() => logout()}
            className='bg-green-800 text-white rounded-sm px-4 py-2 mr-4 cursor-pointer hover:brightness-125'
          >
            로그아웃
          </button>
        )}
        <input
          type='submit'
          value={user ? '댓글 작성' : '로그인'}
          className='bg-green-800 text-white rounded-sm px-4 py-2 cursor-pointer hover:brightness-125'
        />
      </div>
    </form>
  );
}
