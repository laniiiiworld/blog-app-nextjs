'use client';

type Props = {
  categories: string[];
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
};

export default function Categories({ categories, selectedCategory, handleCategoryClick }: Props) {
  return (
    <ul className='flex flex-col items-center p-4 basis-1/5'>
      <h2 className='text-lg font-semibold border-b-2 border-point select-none'>Category</h2>
      {categories.map((category, index) => (
        <li
          key={index}
          onClick={() => handleCategoryClick(category)}
          className={`cursor-pointer ${
            category === selectedCategory && 'text-hover font-semibold'
          } hover:text-hover focus:text-hover`}
        >
          {category}
        </li>
      ))}
    </ul>
  );
}
