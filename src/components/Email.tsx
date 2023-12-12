'use client';

import { sendContactEmail } from '@/service/email';
import { FormEvent, useState } from 'react';

export type EmailContent = {
  from: string;
  subject: string;
  message: string;
};
type Props = {
  recipient: string;
};

const TITLE_CSS = 'pt-2 text-white font-semibold';
const CONTENT_CSS = 'w-full rounded-sm mt-1 outline-none';
const DEFAULT_DATA = {
  from: '',
  subject: '',
  message: '',
};

export default function Email({ recipient }: Props) {
  const [form, setForm] = useState(DEFAULT_DATA);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form).then(() => setForm(DEFAULT_DATA));
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-900 opacity-80 rounded-lg w-96 px-4 pb-4'>
      <h3 className={TITLE_CSS}>Your Email</h3>
      <input
        type='text'
        className={CONTENT_CSS}
        value={form.from}
        onChange={(e) => setForm((prev) => ({ ...prev, from: e.target.value }))}
        required
      />
      <h3 className={TITLE_CSS}>Subject</h3>
      <input
        type='text'
        className={CONTENT_CSS}
        value={form.subject}
        onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
        required
      />
      <h3 className={TITLE_CSS}>Message</h3>
      <textarea
        name='message'
        id='message'
        className={`${CONTENT_CSS} h-56`}
        value={form.message}
        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
        required
      ></textarea>
      <button className='bg-yellow-400 text-black w-full rounded-sm py-1 mt-1'>Submit</button>
    </form>
  );
}
