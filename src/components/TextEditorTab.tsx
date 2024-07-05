import { ViewType } from './TextEditor';

type Props = {
  type: ViewType;
  clicked: ViewType;
};

const TAB_STYLE = 'p-3 cursor-pointer hover:text-black hover:underline';
const CLICKED_TAB_STYLE = 'text-black bg-white rounded-t-lg';

export default function TextEditorTab({ type, clicked }: Props) {
  const isActive = clicked === type;
  return (
    <li
      className={`${TAB_STYLE} ${
        !isActive ? 'border-b' : `${CLICKED_TAB_STYLE} ${type === 'write' ? 'border-r' : 'border border-b-0'}`
      }`}
    >
      {type}
    </li>
  );
}
