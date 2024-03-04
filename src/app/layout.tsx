import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Nanum_Gothic, Oswald } from 'next/font/google';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'] });
const gothic = Nanum_Gothic({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '라니의 블로그',
    template: '라니의 블로그 | %s',
  },
  description: 'FrontEnd 개발자 라니의 블로그',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body
        className={`${gothic.className} flex flex-col w-full h-screen max-w-screen-2xl mx-auto leading-normal font-normal`}
      >
        <Header font={oswald} />
        <main className='grow p-4'>{children}</main>
      </body>
    </html>
  );
}
