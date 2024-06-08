import { useListButtonContext } from '@/context/ListButtonContext';
import { MouseEvent, ReactNode } from 'react';

export type ButtonType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'quote'
  | 'link'
  | 'image'
  | 'code';

type Props = {
  type: ButtonType;
  icon: ReactNode;
  handleClick: (type: ButtonType) => void;
  hasLine?: boolean;
};

export default function TextEditorButton({ type, icon, handleClick, hasLine = false }: Props) {
  const { isList, handleToggle } = useListButtonContext();
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleClick(type);
    handleToggle();
  };
  return (
    <>
      <li>
        <button onClick={onClick} className='w-8 h-8 p-2 rounded text-lg font-bold hover:bg-gray-200'>
          {icon}
        </button>
      </li>
      {hasLine && (
        <li>
          <div
            className={`bg-gray-300 ${!isList ? 'w-[1px] h-3/5 translate-y-2' : 'w-3/5 h-[1px] translate-x-2'}`}
          ></div>
        </li>
      )}
    </>
  );
}
