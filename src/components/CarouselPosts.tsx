import { getNoneFeaturedPosts } from '@/service/posts';
import MultiCarousel from './MultiCarousel';
import PostCard from './PostCard';

export default async function CarouselPosts() {
  const posts = await getNoneFeaturedPosts();

  return (
    <section className='my-4 px-4'>
      <h2 className='text-2xl font-semibold mb-2'>You May Like</h2>
      <MultiCarousel
        children={posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      />
    </section>
  );
}
