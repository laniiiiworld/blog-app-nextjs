import FilterablePosts from '@/components/FilterablePosts';
import { getCategories, getAllPosts } from '@/service/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'FrontEnd 관련 블로그 글',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = getCategories(posts);

  return <FilterablePosts posts={posts} categories={categories} />;
}
