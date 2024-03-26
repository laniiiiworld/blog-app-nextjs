import { ReactNode } from 'react';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: ReactNode;
  offIcon: ReactNode;
  ToggleClass: string;
  children?: ReactNode;
};

export default function ToggleButton({ toggled, onToggle, onIcon, offIcon, ToggleClass, children }: Props) {
  return (
    <button
      onClick={() => onToggle(!toggled)}
      className={`group ${ToggleClass} border-2 border-gray-200 hover:bg-gray-100 transition-all`}
    >
      {toggled ? onIcon : offIcon}
      {children}
    </button>
  );
}
