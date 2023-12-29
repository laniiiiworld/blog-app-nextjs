'use client';

import { useRouter } from 'next/navigation';

export default function ContactButton() {
  const router = useRouter();
  return (
    <button //
      onClick={() => router.push('/contact')}
      className='bg-yellow-500 font-semibold py-1 px-4 rounded-md mt-2'
    >
      Contact me
    </button>
  );
}
