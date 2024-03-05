import Hero from '@/components/Hero';
import AllPosts from '@/components/AllPosts';
import { getAllPosts } from '@/service/posts';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />
      <AllPosts posts={posts} />
    </>
  );
}
