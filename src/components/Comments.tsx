import { CommentsContextProvider } from '@/context/CommentsContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  postId: string;
};

export default function Comments({ postId }: Props) {
  return (
    <CommentsContextProvider postId={postId}>
      <section id='comments' className='mt-8'>
        <CommentForm commentId='' text='' />
        <CommentList />
      </section>
    </CommentsContextProvider>
  );
}
