'use client';

import useComments from '@/hooks/useComments';
import Image from 'next/image';

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  const {
    commentQuery: { data: comments },
  } = useComments(postId);

  return (
    <ul>
      {comments &&
        comments.map((comment) => (
          <li key={comment.id} className='border-b border-gray-200 py-6'>
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
              <div className='flex gap-1 text-gray-500 text-sm'></div>
            </div>
            <p className='w-full min-h-[7rem] mt-6 bg-white whitespace-pre-line'>{comment.content}</p>
          </li>
        ))}
    </ul>
  );
}
