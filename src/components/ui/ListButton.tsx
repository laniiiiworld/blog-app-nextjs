import { useListButtonContext } from '@/context/ListButtonContext';
import { MouseEvent, ReactNode } from 'react';
import { FaList } from 'react-icons/fa6';

type Props = {
  children: ReactNode;
};

export default function ListButton({ children }: Props) {
  const { isList, handleToggle } = useListButtonContext();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleToggle();
  };

  return (
    <>
      <button onClick={handleClick} className='w-8 h-8 p-2 rounded text-lg font-bold hover:bg-gray-200'>
        <FaList />
      </button>
      {isList && children}
    </>
  );
}
