'use client';

type Props = {
  tags: Map<string, number>;
  selected: string;
  onClick: (tag: string) => void;
};

export default function Tags({ tags, selected, onClick }: Props) {
  return (
    <>
      <h2 className='hidden md:block text-xl font-semibold border-b border-light pb-2 mb-4 select-none'>Tags</h2>
      <ul className='hidden md:block'>
        {[...tags.keys()].map((tag) => (
          <li
            key={tag}
            onClick={() => onClick(tag)}
            className={`cursor-pointer ${
              tag === selected ? 'text-hover font-semibold' : 'hover:underline focus:underline'
            }`}
          >
            {tag}
            <span className={`text-sm ${tag !== selected && 'text-light'}`}>{` (${tags.get(tag)})`}</span>
          </li>
        ))}
      </ul>
      <ul className='md:hidden flex gap-2 overflow-x-auto py-4'>
        {[...tags.keys()].map((tag) => (
          <li
            key={tag}
            onClick={() => onClick(tag)}
            className={`cursor-pointer rounded-xl px-3 py-1 whitespace-nowrap ${
              tag === selected ? 'bg-hover text-white' : 'bg-slate-100'
            }`}
          >
            {tag}
            <span className={`text-sm ${tag !== selected && 'text-light'}`}>{` (${tags.get(tag)})`}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
