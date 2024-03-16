'use client';

import { sendContactEmail } from '@/service/email';
import { ChangeEvent, FormEvent, useState } from 'react';
import Banner, { BannerData } from './Banner';
import PopUpButtons from './popup/PopUpButtons';

export type EmailContent = {
  from: string;
  subject: string;
  message: string;
};

const TITLE_STYLE = 'w-16';
const CONTENT_STYLE = 'w-full rounded-md mt-1 px-2 py-1 outline-none border border-green-gray';
const DEFAULT_DATA = {
  from: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<EmailContent>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);
  const handleConfirm = () => {
    if (banner) return;
    if (!checkBeforeSubmit(form)) {
      setBanner({ message: '유효하지 않은 포맷입니다.', state: 'error' });
      setTimeout(() => setBanner(null), 3000);
      return;
    }
    setBanner({ message: '전송중...', state: '' });

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
    <>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} className='w-full pb-4'>
        <div className='flex gap-4 items-center'>
          <label htmlFor='from' className={TITLE_STYLE}>
            From
          </label>
          <input
            type='email'
            id='from'
            name='from'
            required
            autoFocus
            placeholder='이메일을 입력하세요'
            value={form.from}
            onChange={handleChange}
            className={`${CONTENT_STYLE}`}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <label htmlFor='to' className={TITLE_STYLE}>
            To
          </label>
          <input
            type='email'
            id='to'
            name='to'
            value='laniiiiworld@gmail.com'
            disabled
            onChange={handleChange}
            className={CONTENT_STYLE}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <label htmlFor='subject' className={TITLE_STYLE}>
            Subject
          </label>
          <input //
            type='text'
            id='subject'
            name='subject'
            required
            placeholder='제목을 입력하세요'
            value={form.subject}
            onChange={handleChange}
            className={CONTENT_STYLE}
          />
        </div>
        <label htmlFor='message' className={TITLE_STYLE}>
          Message
        </label>
        <textarea
          rows={10}
          id='message'
          name='message'
          required
          placeholder='메세지를 입력하세요'
          value={form.message}
          onChange={handleChange}
          className={CONTENT_STYLE}
        ></textarea>
        {banner && (
          <div className='fixed mt-4 z-40 w-[calc(100%_-_2rem)] -translate-x-2 sm:w-8/12 sm:translate-x-0'>
            <Banner banner={banner} />
          </div>
        )}
        <PopUpButtons wantToClose={false} handleConfirm={handleConfirm} />
      </form>
    </>
  );
}

function checkBeforeSubmit({ from, subject, message }: EmailContent) {
  if (from.trim() === '' || !/\S+@\S+\.\S+/.test(from)) return false;
  if (subject.trim() === '') return false;
  if (message.trim() === '') return false;
  return true;
}
