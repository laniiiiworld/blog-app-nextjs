import Hero from '@/components/Hero';
import Resume from './resume/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Lani의 커리어 소개',
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Resume />
    </>
  );
}
