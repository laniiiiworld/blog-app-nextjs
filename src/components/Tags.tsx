'use client';

type Props = {
  tags: string[];
  selected: string;
  onClick: (tag: string) => void;
};

export default function Tags({ tags, selected, onClick }: Props) {
  return (
    <>
      <h2 className='text-lg font-semibold border-b-2 border-point mb-2 select-none'>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag}
            onClick={() => onClick(tag)}
            className={`cursor-pointer ${
              tag === selected ? 'text-hover font-semibold' : 'hover:underline focus:underline'
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}
