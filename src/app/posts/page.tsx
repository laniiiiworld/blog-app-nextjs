import FilterablePosts from '@/components/FilterablePosts';
import { getTags, getAllPosts } from '@/service/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'FrontEnd 관련 블로그 글',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const tags = getTags(posts);

  return <FilterablePosts posts={posts} tags={tags} />;
}
