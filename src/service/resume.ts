import path from 'path';
import { promises as fs } from 'fs';

export type ResumeItem = {
  title: string;
  description: string;
};

export async function getResumeItems(): Promise<ResumeItem[]> {
  const filePath = path.join(process.cwd(), 'data', 'resume.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}
