import AdjacentPostCard from '@/components/AdjacentPostCard';
import { AdjacentPostData } from '@/model/post';

type Props = {
  prevPost: AdjacentPostData | null;
  nextPost: AdjacentPostData | null;
};

export default async function AdjacentPosts({ prevPost, nextPost }: Props) {
  return (
    <section className='overflow-hidden flex flex-col md:flex-row'>
      {prevPost && <AdjacentPostCard type='prev' post={prevPost} />}
      {nextPost && <AdjacentPostCard type='next' post={nextPost} />}
    </section>
  );
}
