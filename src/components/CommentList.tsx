'use client';

import useComments from '@/hooks/useComments';
import CommentItem from './CommentItem';
import DotFalling from './loading/DotFalling';
import { useCommentsContext } from '@/context/CommentsContext';

export default function CommentList() {
  const { postId, path } = useCommentsContext();
  const { isLoading, comments } = useComments(postId, path);

  if (isLoading) return <DotFalling />;

  return (
    <ul>
      {comments && //
        comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
    </ul>
  );
}
