import FilteredPostList from '@/components/FilteredPostList';
import { getCategories, getPosts } from '@/service/posts';

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = await getCategories(posts);

  return <FilteredPostList posts={posts} categories={categories} />;
}
