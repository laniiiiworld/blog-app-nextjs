'use client';

type Props = {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
};

export default function Categories({ categories, selected, onClick }: Props) {
  return (
    <>
      <h2 className='text-lg font-semibold border-b-2 border-point mb-2 select-none'>Category</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onClick(category)}
            className={`cursor-pointer ${
              category === selected ? 'text-hover font-semibold' : 'hover:underline focus:underline'
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </>
  );
}
