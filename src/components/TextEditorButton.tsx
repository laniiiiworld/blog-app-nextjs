import { useListButtonContext } from '@/context/ListButtonContext';
import { ChangeEvent, MouseEvent, MutableRefObject, ReactNode } from 'react';

export type SelectionType = 'line' | 'part' | 'link' | 'code';
type Props = {
  icon: ReactNode;
  contentRef: MutableRefObject<HTMLTextAreaElement | null>;
  selectionType: SelectionType;
  regexp: RegExp;
  markdown: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  hasLine?: boolean;
};

export default function TextEditorButton({
  icon,
  contentRef,
  selectionType,
  regexp,
  markdown,
  handleChange,
  hasLine = false,
}: Props) {
  const { isList, handleToggle } = useListButtonContext();
  const handleTextAreaEl = () => {
    const textareaEl = contentRef.current;
    if (!textareaEl) return;

    const { newText, startRange, endRange, selectionStart, selectionEnd } = getNewFormatInfo(
      selectionType,
      textareaEl,
      regexp,
      markdown
    );

    textareaEl.setRangeText(newText, startRange, endRange, 'end');
    textareaEl.setSelectionRange(selectionStart, selectionEnd);

    handleChange({ target: textareaEl } as ChangeEvent<HTMLTextAreaElement>);
    textareaEl.focus();
  };
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleTextAreaEl();
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

function getNewFormatInfo(
  selectionType: SelectionType,
  textareaEl: HTMLTextAreaElement,
  regexp: RegExp,
  markdown: string
) {
  const { value } = textareaEl;
  const startRange = findStartRangeIndex(selectionType, textareaEl);
  const endRange = findEndRangeIndex(selectionType, textareaEl);
  const selectedText = value.slice(startRange, endRange);
  const newText = formatSelectedText(selectionType, selectedText, regexp, markdown);

  return {
    newText,
    startRange,
    endRange,
    selectionStart: startRange + (selectionType !== 'line' ? 0 : newText.length),
    selectionEnd: startRange + newText.length,
  };
}

function findStartRangeIndex(selectionType: SelectionType, textareaEl: HTMLTextAreaElement) {
  const { selectionStart, value } = textareaEl;
  if (selectionType !== 'line') return selectionStart;
  const textBeforeCursor = value.slice(0, selectionStart);
  return textBeforeCursor.lastIndexOf('\n') + 1;
}

function findEndRangeIndex(selectionType: SelectionType, textareaEl: HTMLTextAreaElement) {
  const { selectionStart, selectionEnd, value } = textareaEl;
  if (selectionType !== 'line') return selectionEnd;
  const lineEnd = value.indexOf('\n', selectionStart);
  return lineEnd === -1 ? value.length : lineEnd;
}

function formatSelectedText(selectionType: SelectionType, selectedText: string, regexp: RegExp, markdown: string) {
  const replacedText = selectedText.replace(regexp, '');
  switch (selectionType) {
    case 'line':
      return `${markdown}${replacedText}`;
    case 'part':
      return selectedText === replacedText ? `${markdown}${selectedText || '텍스트'}${markdown}` : replacedText;
    case 'link':
      return markdown.replace('텍스트', selectedText || '');
    case 'code':
      return `${markdown}js\n${selectedText || '코드를 입력하세요'}\n${markdown}`;
    default:
      console.error(`Undefined type: ${selectionType}`);
      return '';
  }
}
