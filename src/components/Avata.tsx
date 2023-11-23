import Image from 'next/image';
import profile from '/public/images/profile.png';
import ContactButton from './ContactButton';

export default function Avata() {
  return (
    <section className='text-center leading-relaxed py-4 mt-4'>
      <div className='flex flex-col items-center mt-4 mb-2'>
        <Image src={profile} alt='lani 이미지' className='w-52 rounded-full' />
        <h2 className='text-xl font-semibold'>Lani</h2>
        <p className='font-semibold'>FrontEnd Engineer</p>
        <p>꿈을 코딩하는 사람, 드림코더 라니</p>
      </div>
      <ContactButton />
    </section>
  );
}
