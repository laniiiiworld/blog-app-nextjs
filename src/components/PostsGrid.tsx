import PostCard from './PostCard';
import { LikesContextProvider } from '@/context/LikesContext';
import { Order, usePosts } from '@/hooks/usePosts';
import DotFalling from './loading/DotFalling';

type Props = {
  order?: Order;
  tag?: string;
};

export default function PostsGrid({ order = 'desc', tag }: Props) {
  const { isLoading, posts } = usePosts({ order, tag });
  if (isLoading) return <DotFalling />;

  return (
    <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4'>
      {posts.map((post, index) => (
        <li key={post.path}>
          <LikesContextProvider postId={post.id}>
            <PostCard post={post} isPriority={index < 3} />
          </LikesContextProvider>
        </li>
      ))}
    </ul>
  );
}
