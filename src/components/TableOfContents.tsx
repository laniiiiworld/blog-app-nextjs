'use client';
import { MouseEvent, useEffect, useState } from 'react';

type Headings = {
  id: string;
  title: string;
  size: number;
};

export default function TableOfContents() {
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
    const $nodes = document
      .querySelector('article section')
      ?.querySelectorAll('h2, h3') as NodeListOf<HTMLHeadingElement>;

    const observers: IntersectionObserver[] = [];

    for (const $node of $nodes) {
      const title = $node.textContent as string;
      const id = title.replaceAll(' ', '-');
      const size = parseInt($node.nodeName[1]) - 1;
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
    <ul>
      {headings.map(({ id, title, size }) => (
        <li
          key={id}
          onClick={(e) => handleClick(e, id)}
          className={`transition-all border-l-2 border-gray-200 ${size === 1 ? 'pl-3' : 'pl-6'} ${
            current === title ? 'text-hover font-semibold' : 'text-light hover:text-hover'
          }`}
        >
          <a href={`#${id}`}>{title}</a>
        </li>
      ))}
    </ul>
  );
}
