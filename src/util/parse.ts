import { Headings } from '@/components/TableOfContents';

export function parseHeadingsFrom(content: string): Headings[] {
  if (!content) return [];

  const headingRegex = /^(#{1,3})\s+(.*)/gm;
  const headings: Headings[] = [];

  while (true) {
    const match = headingRegex.exec(removeCodeAndQuotesFrom(content));
    if (!match) break;
    const [, hashes, title] = match;
    const id = title.replaceAll(' ', '-');
    const size = hashes.length - 1;

    headings.push({ id, title, size });
  }

  return headings;
}

export function removeCodeAndQuotesFrom(content: string) {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const inlineCodeRegex = /`[^`]*`/g;
  const quoteRegex = /^>.*$/gm;

  return content //
    .replace(codeBlockRegex, '')
    .replace(inlineCodeRegex, '')
    .replace(quoteRegex, '');
}
