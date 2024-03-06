import AdjacentPostCard from '@/components/AdjacentPostCard';
import PostPageImage from '@/components/PostPageImage';
import PostContent from '@/components/PostContent';
import { getFeaturedPosts, getPostData } from '@/service/posts';
import { Metadata } from 'next';

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
  const { prevPost, nextPost } = post;

  return (
    <article className='m-2 mt-10 relative rounded-2xl overflow-hidden bg-slate-100 shadow-lg'>
      <PostPageImage post={post} width={760} height={420} />
      <PostContent post={post} />
      <section className='flex flex-col md:flex-row'>
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
