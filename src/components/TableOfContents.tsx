'use client';
import { useEffect, useState } from 'react';

type Headings = {
  index: string;
  title: string;
  size: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [current, setCurrent] = useState<string>('');

  useEffect(() => {
    const $nodes = document
      .querySelector('article section')
      ?.querySelectorAll('h2, h3') as NodeListOf<HTMLHeadingElement>;

    const observers: IntersectionObserver[] = [];

    for (const $node of $nodes) {
      const title = $node.textContent as string;
      const index = title.replaceAll(' ', '-');
      const size = parseInt($node.nodeName[1]) - 1;
      setHeadings((prev) => {
        if (prev.some((v) => v.index === index)) return prev;
        return [...prev, { index, title, size }];
      });

      $node.id = index;

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
    <aside className='max-lg:hidden sticky top-24 left-0 p-2 w-1/5 h-full basis-0 shrink-0 grow'>
      <ul>
        {headings.map(({ index, title, size }) => (
          <li
            key={index}
            className={`transition-all border-l-2 border-gray-200 pl-[${size * 10}px] ${
              current === title ? 'text-hover font-semibold' : 'text-light hover:text-hover'
            }`}
          >
            <a href={`#${index}`}>{title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
