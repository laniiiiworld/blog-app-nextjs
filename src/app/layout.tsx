'use client';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import { Nanum_Gothic, Oswald } from 'next/font/google';
import { AuthContextProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PopUpContextProvider } from '@/context/PopUpContext';
import { ToastContainer } from 'react-toastify';

const oswald = Oswald({ subsets: ['latin'] });
const gothic = Nanum_Gothic({ weight: ['400', '700'], subsets: ['latin'] });
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`${gothic.className} w-full h-screen leading-normal font-normal`}>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <PopUpContextProvider>
              <Header font={oswald} />
              <main className='max-w-screen-xl mx-auto grow p-4 pt-12 pb-24'>{children}</main>
              <ToastContainer />
            </PopUpContextProvider>
          </QueryClientProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
