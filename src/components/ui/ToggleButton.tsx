import { ReactNode } from 'react';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: ReactNode;
  offIcon: ReactNode;
};

export default function ToggleButton({ toggled, onToggle, onIcon, offIcon }: Props) {
  return (
    <button
      onClick={() => onToggle(!toggled)}
      className='group text-2xl border-2 border-gray-200 rounded-full p-2 hover:bg-gray-100 transition-all'
    >
      {toggled ? onIcon : offIcon}
    </button>
  );
}
