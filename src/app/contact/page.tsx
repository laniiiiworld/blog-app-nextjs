import ContactForm from '@/components/ContactForm';
import { getContactInfo } from '@/service/contact';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Lani에게 메일 보내기',
};

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  return (
    <section className='flex flex-col items-center gap-2 mt-8'>
      <h2 className='text-2xl font-semibold'>Contact me</h2>
      <p>{contactInfo.email}</p>
      <div className='cursor-pointer hover:text-yellow-400'>
        <Link target='_blank' href={contactInfo.githubUrl}>
          <FaGithub className='text-4xl' />
        </Link>
      </div>
      <h2 className='text-2xl font-semibold mt-4'>Or Send me an email</h2>
      <ContactForm />
    </section>
  );
}
