'use client';

import { useCommentsContext } from '@/context/CommentsContext';
import CommentItem from './CommentItem';
import Loading from './loading/Loading';

export default function CommentList() {
  const { isLoading, comments } = useCommentsContext();

  if (isLoading) return <Loading />;

  return (
    <>
      <ul>
        {comments && //
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </ul>
    </>
  );
}
