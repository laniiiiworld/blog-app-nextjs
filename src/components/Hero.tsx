'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePopUpContext } from '@/context/PopUpContext';
import profile from '/public/images/profile.jpg';
import { FaGithub } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import EmailPopup from './popup/EmailPopup';

export default function Hero() {
  const { setPopupType } = usePopUpContext();

  return (
    <>
      <EmailPopup />
      <section className='py-12 mt-4 flex flex-col items-center justify-center md:flex-row'>
        <Image //
          src={profile}
          alt='lani'
          width={170}
          height={170}
          className='rounded-full'
          priority
        />
        <div className='ml-0 flex flex-col gap-1 items-center md:items-start md:ml-8'>
          <h2 className='text-lg font-semibold mt-2'>이랑 (Lani)</h2>
          <h3 className='text-lg font-semibold'>FrontEnd Engineer</h3>
          <p>가장 강력한 표현은 간단하고 명료하다</p>
          <div className='flex gap-4 items-center text-3xl text-gray-700 mt-2'>
            <Link target='_blank' href='https://github.com/laniiiiworld' className='cursor-pointer'>
              <FaGithub className='hover:text-yellow-400' />
            </Link>
            <button onClick={() => setPopupType('email')}>
              <MdOutlineEmail className='hover:text-yellow-400' />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
