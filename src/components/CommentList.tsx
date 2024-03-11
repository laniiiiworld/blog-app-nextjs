'use client';

import { useCommentsContext } from '@/context/CommentsContext';
import Comment from './Comment';

export default function CommentList() {
  const { comments } = useCommentsContext();
  return (
    <>
      <ul>
        {comments && //
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </ul>
    </>
  );
}
