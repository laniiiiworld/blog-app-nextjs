'use client';

import Image from 'next/image';
import { Comment } from './Comments';

type Props = {
  comment: Comment;
};

export default function Comment({ comment }: Props) {
  return (
    <>
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
        </div>
        <p className='w-full min-h-[7rem] mt-6 bg-white whitespace-pre-line'>{comment.content}</p>
      </li>
    </>
  );
}
