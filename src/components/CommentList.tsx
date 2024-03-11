'use client';

import { useCommentsContext } from '@/context/CommentsContext';
import CommentItem from './CommentItem';

export default function CommentList() {
  const { comments } = useCommentsContext();
  return (
    <>
      <ul>
        {comments && //
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </ul>
    </>
  );
}
