import { CommentsContextProvider } from '@/context/CommentsContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  postId: string;
  path: string;
};

export default function Comments({ postId, path }: Props) {
  return (
    <CommentsContextProvider postId={postId} path={path}>
      <section id='comments' className='mt-8'>
        <CommentForm commentId='' text='' />
        <CommentList />
      </section>
    </CommentsContextProvider>
  );
}
