import Avata from '@/components/Avata';
import CarouselPostList from '@/components/CarouselPostList';
import FeaturedPostList from '@/components/FeaturedPostList';
import { getPosts } from '@/service/posts';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className='p-4'>
      <Avata />
      <h2 className='font-semibold text-lg pl-8'>Featured Posts</h2>
      <FeaturedPostList posts={posts} />
      <h2 className='font-semibold text-lg pl-8'>You May Like</h2>
      <CarouselPostList posts={posts} />
    </div>
  );
}
