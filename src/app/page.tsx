import Hero from '@/components/Hero';
import AllPosts from '@/components/AllPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '라니의 블로그',
    template: '라니의 블로그 | %s',
  },
  description: 'FrontEnd 개발자 라니의 블로그',
  icons: { icon: '/favicon.ico' },
};

export default async function HomePage() {
  return (
    <>
      <Hero />
      <AllPosts />
    </>
  );
}
