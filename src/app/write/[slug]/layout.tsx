import { getPost } from '@/service/post';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  try {
    const post = await getPost(decodeURIComponent(slug));
    if (!post) notFound();
    const { title, description } = post;
    return {
      title: `(작성중) ${title}`,
      description,
    };
  } catch (error) {
    notFound();
  }
}

export default async function PostPageLayout({ children }: Props) {
  return <>{children}</>;
}
