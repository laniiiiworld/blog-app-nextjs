import Header from '@/components/Header';
import { Nanum_Gothic, Oswald } from 'next/font/google';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'] });
const gothic = Nanum_Gothic({ weight: ['400', '700'], subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`${gothic.className} w-full h-screen leading-normal font-normal`}>
        <Header font={oswald} />
        <main className='max-w-screen-xl mx-auto grow p-4 pt-12 pb-24'>{children}</main>
      </body>
    </html>
  );
}
