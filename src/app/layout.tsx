import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Nanum_Gothic, Oswald } from 'next/font/google';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'] });
const gothic = Nanum_Gothic({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: '라니의 블로그',
  description: 'NextJS와 TypeScript를 이용하여 만든 블로그',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body
        className={`${gothic.className} flex flex-col w-full h-screen max-w-screen-2xl mx-auto leading-normal font-normal`}
      >
        <Header font={oswald} />
        <main className='grow p-4'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
