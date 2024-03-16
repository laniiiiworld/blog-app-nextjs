import { EmailContent } from '@/components/ContactForm';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail({ from, subject, message }: EmailContent) {
  return await transporter.sendMail({
    to: process.env.AUTH_USER,
    from,
    subject: `[Blog App] ${subject}`,
    html: `
    <h1>${subject}</h1>
    <div>${message}</div>
    <br/>
    <p>보낸사람 : ${from}</p>
    `,
  });
}
