import path from 'path';
import { promises as fs } from 'fs';
import { EmailContent } from '@/components/ContactForm';
import { createTransport } from 'nodemailer';

export type ContactInfo = {
  email: string;
  githubUrl: string;
};

export async function getContactInfo(): Promise<ContactInfo> {
  const filePath = path.join(process.cwd(), 'data', 'contact.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

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
