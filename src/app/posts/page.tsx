import PostItem from '@/components/PostItem';
import { Post, getPosts } from '@/service/posts';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <section className='flex flex-wrap gap-4 p-4 justify-center'>
      {posts.map((post) => (
        <PostItem key={post.path} post={post} />
      ))}
    </section>
  );
}
