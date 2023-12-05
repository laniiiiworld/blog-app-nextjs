'use client';

import { Post } from '@/service/posts';
import PostItem from './PostItem';

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <section className='flex flex-wrap gap-4 p-4 justify-center basis-4/5'>
      {posts.map((post) => (
        <PostItem key={post.path} post={post} />
      ))}
    </section>
  );
}
