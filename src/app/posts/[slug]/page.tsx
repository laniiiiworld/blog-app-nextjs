import AdjacentPostCard from '@/components/AdjacentPostCard';
import Comments from '@/components/Comments';
import PostContent from '@/components/PostContent';
import TableOfContents from '@/components/TableOfContents';
import TopButton from '@/components/ui/TopButton';
import { PopUpContextProvider } from '@/context/PopUpContext';
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
    <PopUpContextProvider>
      <article className='relative flex mt-10'>
        <div className='w-full lg:basis-0 lg:grow-[4] lg:w-4/5'>
          <PostContent post={post} />
          <section className='overflow-hidden flex flex-col px-4 md:flex-row'>
            {prevPost && <AdjacentPostCard type='prev' post={prevPost} />}
            {nextPost && <AdjacentPostCard type='next' post={nextPost} />}
          </section>
          <Comments postId={post.id} />
        </div>
        <aside className='max-lg:hidden sticky top-44 left-0 p-2 w-1/5 h-full basis-0 shrink-0 grow'>
          <TableOfContents />
        </aside>
        <TopButton />
      </article>
    </PopUpContextProvider>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
