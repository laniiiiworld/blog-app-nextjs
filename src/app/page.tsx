import Hero from '@/components/Hero';
import CarouselPostList from '@/components/CarouselPostList';
import FeaturedPosts from '@/components/FeaturedPosts';
import { getAllPosts } from '@/service/posts';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />
      <FeaturedPosts />
      <h2 className='text-2xl font-semibold pl-8'>You May Like</h2>
      <CarouselPostList posts={posts} />
    </>
  );
}
