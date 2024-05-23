'use client';
import { parseHeadingsFrom } from '@/util/parse';
import { MouseEvent, MutableRefObject, useCallback, useEffect, useState } from 'react';

export type Headings = {
  id: string;
  title: string;
  size: number;
};

type Props = {
  content: string;
  contentRef: MutableRefObject<HTMLElement | null>;
};

export default function TableOfContents({ content, contentRef }: Props) {
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [current, setCurrent] = useState<string>('');

  const handleClick = useCallback(
    (event: MouseEvent, id: string) => {
      event.preventDefault();
      const $target = contentRef.current?.querySelector(`:is(h1, h2, h3)[id="${id}"]`) as HTMLHeadingElement;
      if (!$target) return;
      const { top, left } = $target.getBoundingClientRect();
      window.scrollBy({ top: top - 80, left, behavior: 'smooth' });
    },
    [contentRef]
  );
  const intersectionCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleEntries = entries //
      .filter(({ isIntersecting }) => isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length > 0) {
      setCurrent(visibleEntries[0].target.textContent || '');
    }
  }, []);

  useEffect(() => {
    setHeadings(parseHeadingsFrom(content));
  }, [content]);

  useEffect(() => {
    const io = new IntersectionObserver(intersectionCallback, {
      threshold: 0.5,
    });
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        observeHeadingsWithIO();
      }
    });
    const observeHeadingsWithIO = () => {
      for (const { id } of headings) {
        const $node = contentRef.current?.querySelector(`:is(h1, h2, h3)[id="${id}"]`) as HTMLHeadingElement;
        if (!$node) continue;
        io.observe($node);
      }
    };

    observeHeadingsWithIO();

    contentRef.current &&
      mo.observe(contentRef.current, {
        subtree: true,
        childList: true,
        attributeFilter: ['h1', 'h2', 'h3'],
      });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [headings, contentRef, intersectionCallback]);

  return (
    <ul className='max-h-[520px] w-full overflow-y-auto border-l-2 border-gray-200'>
      {headings.map(({ id, title, size }) => (
        <li
          key={id}
          onClick={(e) => handleClick(e, id)}
          className={`transition-all ${size === 1 ? 'pl-3' : 'pl-6'} ${
            current === title ? 'text-hover font-semibold' : 'text-light hover:text-hover'
          }`}
        >
          <a href={`#${id}`}>{title}</a>
        </li>
      ))}
    </ul>
  );
}
