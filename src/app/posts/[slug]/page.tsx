import AdjacentPostCard from '@/components/AdjacentPostCard';
import PostContent from '@/components/PostContent';
import { getFeaturedPosts, getPostData } from '@/service/posts';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const { title, description } = await getPostData(slug);
  return {
    title,
    description,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { title, path, prevPost, nextPost } = post;

  return (
    <article className='m-2 relative rounded-2xl overflow-hidden bg-slate-100 shadow-lg'>
      <Image
        className='w-full h-1/6 max-h-[450px] object-cover'
        src={`/images/posts/${path}.png`} //
        alt={title}
        width={760}
        height={420}
      />
      <PostContent post={post} />
      <section className='flex'>
        {prevPost && <AdjacentPostCard type='prev' post={prevPost} />}
        {nextPost && <AdjacentPostCard type='next' post={nextPost} />}
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
