import AdjacentPostCard from '@/components/AdjacentPostCard';
import PostContent from '@/components/PostContent';
import TableOfContents from '@/components/TableOfContents';
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
    <article className='relative flex mt-10'>
      <div className='w-full lg:basis-0 lg:grow-[4] lg:w-4/5'>
        <PostContent post={post} />
        <section className='overflow-hidden flex flex-col md:flex-row'>
          {prevPost && <AdjacentPostCard type='prev' post={prevPost} />}
          {nextPost && <AdjacentPostCard type='next' post={nextPost} />}
        </section>
      </div>
      <TableOfContents />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
