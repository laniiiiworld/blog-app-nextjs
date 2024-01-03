import { sendEmail } from '@/service/contact';
import { object, string } from 'yup';

const bodySchema = object().shape({
  from: string().email().required(),
  subject: string().required(),
  message: string().required(),
});

export async function POST(request: Request) {
  const body = await request.json();
  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: '유효하지 않은 포맷입니다.' }), { status: 400 });
  }
  const { from, subject, message } = body;
  return sendEmail({ from, subject, message })
    .then(() => new Response(JSON.stringify({ message: '메일 전송에 성공했습니다.' }), { status: 200 }))
    .catch((error) => {
      console.error(error);
      new Response(JSON.stringify({ message: '메일 전송에 실패했습니다.' }), { status: 500 });
    });
}
