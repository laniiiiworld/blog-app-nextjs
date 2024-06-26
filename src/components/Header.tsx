import { useAuthContext } from '@/context/AuthContext';
import { NextFont } from 'next/dist/compiled/@next/font';
import Link from 'next/link';

type Props = {
  font: NextFont;
};

export default function Header({ font }: Props) {
  const { user } = useAuthContext();

  return (
    <header className='fixed w-full z-10 p-4 bg-white/70 backdrop-blur-lg text-black border-b border-border-light select-none'>
      <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
        <Link href='/'>
          <h1 className={`${font.className} text-2xl`}>{"Lani's Blog"}</h1>
        </Link>
        <nav className='flex gap-4 pt-1 text-lg font-semibold'>
          {user?.isAdmin && (
            <Link href='/write' className='hover:text-hover'>
              Write
            </Link>
          )}
          <Link href='/' className='hover:text-hover'>
            Home
          </Link>
          <Link href='/posts' className='hover:text-hover'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}
