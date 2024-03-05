'use client';

type Props = {
  tags: string[];
  selected: string;
  onClick: (tag: string) => void;
};

export default function Tags({ tags, selected, onClick }: Props) {
  return (
    <>
      <h2 className='hidden md:block text-xl font-semibold border-b border-light pb-2 mb-4 select-none'>Tags</h2>
      <ul className='hidden md:block'>
        {tags.map((tag) => (
          <li
            key={tag}
            onClick={() => onClick(tag)}
            className={`cursor-pointer ${
              tag === selected ? 'text-hover font-semibold' : 'text-light hover:underline focus:underline'
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
      <ul className='md:hidden flex gap-2 overflow-x-auto py-4'>
        {tags.map((tag) => (
          <li
            key={tag}
            onClick={() => onClick(tag)}
            className={`cursor-pointer rounded-xl px-3 py-1 whitespace-nowrap ${
              tag === selected ? 'bg-hover text-white' : 'bg-slate-100'
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}
