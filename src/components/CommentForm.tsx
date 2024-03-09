'use client';

import { useAuthContext } from '@/context/AuthContext';
import { Post } from '@/service/posts';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  post: Post;
};

export default function CommentForm({ post }: Props) {
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
    if (!post?.id) return;

    console.log(content);
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
