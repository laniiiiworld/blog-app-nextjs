'use client';

import { sendContactEmail } from '@/service/email';
import { ChangeEvent, FormEvent, useState } from 'react';
import Banner, { BannerData } from './Banner';

export type EmailContent = {
  from: string;
  subject: string;
  message: string;
};

const TITLE_STYLE = 'block pt-2 text-white font-semibold';
const CONTENT_STYLE = 'w-full rounded-sm mt-1 outline-none';
const DEFAULT_DATA = {
  from: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<EmailContent>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form)
      .then((data) => {
        setForm(DEFAULT_DATA);
        setBanner({ message: data.message, state: 'success' });
      })
      .catch((error) => {
        setBanner({ message: error.message, state: 'error' });
      })
      .finally(() => {
        setTimeout(() => setBanner(null), 3000);
      });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className='w-full max-w-md'>
      {banner && <Banner banner={banner} />}
      <form onSubmit={handleSubmit} className='w-full bg-gray-700 rounded-lg px-4 pb-4 my-2'>
        <label htmlFor='from' className={TITLE_STYLE}>
          Your Email
        </label>
        <input
          type='email'
          id='from'
          name='from'
          required
          autoFocus
          value={form.from}
          onChange={handleChange}
          className={CONTENT_STYLE}
        />
        <label htmlFor='subject' className={TITLE_STYLE}>
          Subject
        </label>
        <input //
          type='text'
          id='subject'
          name='subject'
          required
          value={form.subject}
          onChange={handleChange}
          className={CONTENT_STYLE}
        />
        <label htmlFor='message' className={TITLE_STYLE}>
          Message
        </label>
        <textarea
          rows={10}
          id='message'
          name='message'
          required
          value={form.message}
          onChange={handleChange}
          className={CONTENT_STYLE}
        ></textarea>
        <button className='bg-yellow-400 text-black w-full rounded-sm py-1 mt-1 hover:bg-yellow-500'>Submit</button>
      </form>
    </section>
  );
}
