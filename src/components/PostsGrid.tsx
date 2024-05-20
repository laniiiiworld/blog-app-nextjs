'use client';

import { PostCardData } from '@/model/post';
import PostCard from './PostCard';
import { LikesContextProvider } from '@/context/LikesContext';

type Props = {
  posts: PostCardData[];
};

export default function PostsGrid({ posts }: Props) {
  return (
    <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4'>
      {posts.map((post) => (
        <li key={post.path}>
          <LikesContextProvider postId={post.id}>
            <PostCard post={post} />
          </LikesContextProvider>
        </li>
      ))}
    </ul>
  );
}
