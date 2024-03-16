import FilterablePosts from '@/components/FilterablePosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'FrontEnd 관련 블로그 글',
};

export default async function PostsPage() {
  return <FilterablePosts />;
}
