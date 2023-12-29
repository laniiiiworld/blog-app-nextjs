import PostsGrid from '@/components/PostsGrid';
import { getFeaturedPosts } from '@/service/posts';

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section>
      <h2 className='text-2xl font-semibold pl-8'>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
