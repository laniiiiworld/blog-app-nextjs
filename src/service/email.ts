import { EmailContent } from '@/components/ContactForm';

export async function sendContactEmail(email: EmailContent) {
  const response = await fetch('/api/email', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '서버 요청에 실패했습니다.');
  }
  return data;
}
