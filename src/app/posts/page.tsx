import FilterablePosts from '@/components/FilterablePosts';
import { getCategories, getAllPosts } from '@/service/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = getCategories(posts);

  return <FilterablePosts posts={posts} categories={categories} />;
}
