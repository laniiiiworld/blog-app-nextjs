'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useCommentsContext } from '@/context/CommentsContext';
import useComments from '@/hooks/useComments';
import { CommentData } from '@/model/post';

type Props = {
  comment: CommentData;
};

export default function CommentFormToUpdate({ comment }: Props) {
  const { postId, path, setEdited } = useCommentsContext();
  const { updateComment } = useComments(postId, path);
  const [content, setContent] = useState(comment.content);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateComment.mutate({ comment: { ...comment, content } });
    setEdited('');
    setContent('');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='flex my-4 gap-4'>
          <textarea
            name='content' //
            id='content'
            placeholder='댓글을 작성하세요'
            required
            value={content}
            onChange={onChange}
            className='resize-none outline-none border border-gray-200 w-full h-28 rounded-sm p-4'
          />
        </div>
        <div className='text-right'>
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
        </div>
      </form>
    </>
  );
}
