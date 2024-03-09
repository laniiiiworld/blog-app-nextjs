'use client';

import { Post } from '@/service/posts';
import CommentForm from './CommentForm';

type Props = {
  post: Post;
};

type User = {
  uid: string;
  photoURL: string;
  email: string;
  displayName: string;
};

export type Comment = {
  postId: string;
  id: string;
  content: string;
  createdAt: string;
  user: User;
};

export default function Comments({ post }: Props) {
  return (
    <section className='mt-8 px-4'>
      <h4 className='font-bold text-xl'>댓글</h4>
      <CommentForm post={post} />
    </section>
  );
}
