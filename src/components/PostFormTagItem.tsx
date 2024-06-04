type Props = {
  tag: string;
  handleClick: (tag: string) => void;
};

export default function PostFormTagItem({ tag, handleClick }: Props) {
  return (
    <li className='rounded bg-gray-100 shadow-sm p-2'>
      {tag}
      <button onClick={(e) => handleClick(tag)} className='pl-3 pr-2 text-slate-600 hover:underline'>
        X
      </button>
    </li>
  );
}
