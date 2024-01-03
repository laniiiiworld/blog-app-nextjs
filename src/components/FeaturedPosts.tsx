import PostsGrid from '@/components/PostsGrid';
import { getFeaturedPosts } from '@/service/posts';

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section className='my-4'>
      <h2 className='text-2xl font-semibold pl-4'>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
