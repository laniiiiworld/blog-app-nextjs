'use client';
import { MouseEvent, useEffect, useState } from 'react';

type Headings = {
  id: string;
  title: string;
  size: number;
};
type Props = {
  content: string;
};

export default function TableOfContents({ content }: Props) {
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [current, setCurrent] = useState<string>('');
  const handleClick = (event: MouseEvent, id: string) => {
    event.preventDefault();
    const $target = document.querySelector(`[id="${id}"]`);
    if (!$target) return;
    const { top, left } = $target.getBoundingClientRect();
    window.scrollBy({ top: top - 80, left, behavior: 'smooth' });
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const headingRegex = /^(#{1,3})\s+(.*)/gm;
    while (true) {
      const match = headingRegex.exec(content);

      if (!match) break;

      const [, order, title] = match;
      const id = title.replaceAll(' ', '-');
      const size = order.length - 1;
      const $node = document.querySelector(`[id="${id}"]`) as HTMLHeadingElement;

      if (!$node) continue;

      setHeadings((prev) => {
        if (prev.some((v) => v.id === id)) return prev;
        return [...prev, { id, title, size }];
      });

      let observer = new IntersectionObserver(
        ([
          {
            isIntersecting,
            target: { textContent },
          },
        ]) => isIntersecting && setCurrent(textContent || ''),
        { threshold: 0.5 }
      );
      observer.observe($node);
      observers.push(observer);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

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
