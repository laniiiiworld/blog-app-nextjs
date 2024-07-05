import { useListButtonContext } from '@/context/ListButtonContext';
import { ChangeEvent, MouseEvent, MutableRefObject, ReactNode, useRef } from 'react';
import { ButtonType } from './TextEditorButtons';
import { addPostImage } from '@/service/postImage';
import { usePostFormContext } from '@/context/PostFormContext';
import { checkFileExtension, checkMaxFileSize } from '@/util/imageFileValidation';

export type SelectionType = 'line' | 'part' | 'link' | 'image' | 'code';
type Props = {
  type: ButtonType;
  icon: ReactNode;
  contentRef: MutableRefObject<HTMLTextAreaElement | null>;
  selectionType: SelectionType;
  regexp: RegExp;
  markdown: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  hasLine?: boolean;
};

export default function TextEditorButton({
  type,
  icon,
  contentRef,
  selectionType,
  regexp,
  markdown,
  handleChange,
  hasLine = false,
}: Props) {
  const { form, handleForm } = usePostFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isList, handleToggle } = useListButtonContext();
  const handleTextAreaEl = (placeholder: string) => {
    const textareaEl = contentRef.current;
    if (!textareaEl) return;

    const { newText, startRange, endRange, selectionStart, selectionEnd } = getNewFormatInfo(
      selectionType,
      textareaEl,
      regexp,
      markdown,
      placeholder
    );

    textareaEl.setRangeText(newText, startRange, endRange, 'end');
    textareaEl.setSelectionRange(selectionStart, selectionEnd);

    handleChange({ target: textareaEl } as ChangeEvent<HTMLTextAreaElement>);
    textareaEl.focus();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;
    if (!checkFileExtension(file.type) || !checkMaxFileSize(file.size, 8)) {
      e.target.value = '';
      return;
    }

    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    const [fileName, fileExtension] = file.name.split('.');

    //업로드중인 파일 인지할 수 있도록 표시
    const placeholder = `${fileName}.${fileExtension} 업로드중...`;
    handleTextAreaEl(placeholder);

    //업로드
    const downloadURL = await addPostImage('content', form.id, file);

    //업로드한 파일 preview에 display
    handleForm({
      name: 'content',
      value: `![${placeholder}]()`,
      replacedValue: `![${fileName}](${downloadURL})`,
    });
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    type === 'image' && fileInputRef.current && fileInputRef.current.click();
    type !== 'image' && handleTextAreaEl('');
    handleToggle();
  };

  return (
    <>
      <li>
        {type === 'image' && <input ref={fileInputRef} type='file' onChange={handleFileSelect} className='hidden' />}
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
  markdown: string,
  placeholder: string
) {
  const { value } = textareaEl;
  const startRange = findStartRangeIndex(selectionType, textareaEl);
  const endRange = findEndRangeIndex(selectionType, textareaEl);
  const selectedText = value.slice(startRange, endRange);
  const newText = formatSelectedText(selectionType, selectedText, regexp, markdown, placeholder);

  return {
    newText,
    startRange,
    endRange,
    selectionStart: startRange + (selectionType !== 'line' && selectionType !== 'image' ? 0 : newText.length),
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

function formatSelectedText(
  selectionType: SelectionType,
  selectedText: string,
  regexp: RegExp,
  markdown: string,
  placeholder: string
) {
  const replacedText = selectedText.replace(regexp, '');
  switch (selectionType) {
    case 'line':
      return `${markdown}${replacedText}`;
    case 'part':
      return selectedText === replacedText ? `${markdown}${selectedText || '텍스트'}${markdown}` : replacedText;
    case 'link':
      return markdown.replace('텍스트', selectedText || '');
    case 'image':
      return markdown.replace('fileName', placeholder);
    case 'code':
      return `${markdown}js\n${selectedText || '코드를 입력하세요'}\n${markdown}`;
    default:
      console.error(`Undefined type: ${selectionType}`);
      return '';
  }
}
