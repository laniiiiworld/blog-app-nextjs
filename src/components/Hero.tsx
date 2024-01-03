import Image from 'next/image';
import profile from '/public/images/profile.jpg';
import ContactButton from './ContactButton';

export default function Hero() {
  return (
    <section className='text-center leading-relaxed py-4 mt-4'>
      <Image //
        src={profile}
        alt='lani'
        width={250}
        height={250}
        className='rounded-full mx-auto'
        priority
      />
      <h2 className='text-2xl font-semibold mt-2'>Lani</h2>
      <h3 className='text-lg font-semibold'>FrontEnd Engineer</h3>
      <p>꿈을 코딩하는 사람, 드림코더 라니</p>
      <ContactButton />
    </section>
  );
}
