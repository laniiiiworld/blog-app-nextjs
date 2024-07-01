type Props = {
  type: 'cancle' | 'confirm';
  name: string;
  handleClick: () => void;
};

export default function PopUpButton({ type, name, handleClick }: Props) {
  const CANCEL_STYLE = 'bg-white text-green-800 hover:bg-gray-100';
  const CONFIRM_STYPE = 'bg-green-800 text-white hover:brightness-125';

  return (
    <button
      onClick={handleClick}
      className={`${type === 'cancle' ? CANCEL_STYLE : CONFIRM_STYPE} rounded-sm px-4 py-2 cursor-pointer`}
    >
      {name}
    </button>
  );
}
