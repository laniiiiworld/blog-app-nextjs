import { CommentsContextProvider } from '@/context/CommentsContext';
import CommentList from './CommentList';
import CommentFormToAdd from './CommentFormToAdd';

type Props = {
  postId: string;
  path: string;
};

export default function Comments({ postId, path }: Props) {
  return (
    <CommentsContextProvider postId={postId} path={path}>
      <section id='comments' className='mt-8'>
        <CommentFormToAdd />
        <CommentList />
      </section>
    </CommentsContextProvider>
  );
}
