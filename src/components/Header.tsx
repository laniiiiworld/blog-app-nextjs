import { NextFont } from 'next/dist/compiled/@next/font';
import Link from 'next/link';

type Props = {
  font: NextFont;
};

export default function Header({ font }: Props) {
  return (
    <header className='flex justify-between items-center p-4 border-b border-border-light select-none'>
      <h1 className={`${font.className} text-2xl`}>
        <Link href='/'>Lani's Blog</Link>
      </h1>
      <nav className='flex gap-2 pt-1 text-lg font-semibold'>
        <Link href='/' className='hover:text-hover'>
          Home
        </Link>
        <Link href='/about' className='hover:text-hover'>
          About
        </Link>
        <Link href='/posts' className='hover:text-hover'>
          Posts
        </Link>
        <Link href='/contact' className='hover:text-hover'>
          Contact
        </Link>
      </nav>
    </header>
  );
}
