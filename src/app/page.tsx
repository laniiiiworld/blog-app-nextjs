import Hero from '@/components/Hero';
import CarouselPostList from '@/components/CarouselPostList';
import FeaturedPostList from '@/components/FeaturedPostList';
import { getPosts } from '@/service/posts';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <Hero />
      <h2 className='font-semibold text-lg pl-8'>Featured Posts</h2>
      <FeaturedPostList posts={posts} />
      <h2 className='font-semibold text-lg pl-8'>You May Like</h2>
      <CarouselPostList posts={posts} />
    </>
  );
}
