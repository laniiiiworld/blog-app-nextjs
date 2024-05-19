'use client';

import { useCommentsContext } from '@/context/CommentsContext';
import CommentItem from './CommentItem';
import DotFalling from './loading/DotFalling';

export default function CommentList() {
  const { isLoading, comments } = useCommentsContext();

  if (isLoading) return <DotFalling />;

  return (
    <>
      <ul>
        {comments && //
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </ul>
    </>
  );
}
