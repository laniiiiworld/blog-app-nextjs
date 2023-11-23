'use client';

import { useRouter } from 'next/navigation';

export default function ContactButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/contact')} className='bg-yellow-500 font-semibold px-2 rounded-md'>
      Contact me
    </button>
  );
}
