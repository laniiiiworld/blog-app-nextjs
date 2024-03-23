import { CommentsContextProvider } from '@/context/CommentsContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  postId: string;
};

export type User = {
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

export default function Comments({ postId }: Props) {
  return (
    <CommentsContextProvider postId={postId}>
      <section className='mt-8'>
        <CommentForm commentId='' text='' />
        <CommentList />
      </section>
    </CommentsContextProvider>
  );
}
