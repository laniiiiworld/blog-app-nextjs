import { ChangeEvent, KeyboardEvent } from 'react';
import TextEditor from './TextEditor';

const LABEL_STYLE = 'block mb-2 text-slate-900 text-lg';
const REQUIRED_STYLE =
  "after:content-[''] after:inline-block after:ml-2 after:w-2 after:h-2 after:rounded-full after:bg-orange-400";
export const INPUT_STYPE = 'block mx-auto p-2 text-base rounded border border-border-light w-full outline-none';

type Props = {
  type: 'input' | 'textarea';
  labelName: string;
  tagName: string;
  text: string;
  disabled?: boolean;
  required?: boolean;
  placeholderText?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export default function PostFormItem({
  type,
  labelName,
  tagName,
  text,
  disabled = false,
  required = false,
  placeholderText,
  handleChange,
  handleKeyDown,
}: Props) {
  const placeholder = placeholderText ? placeholderText : `${labelName}을(를) 입력하세요`;
  return (
    <div className='mt-5'>
      <label className={`${LABEL_STYLE} ${required && REQUIRED_STYLE}`} htmlFor={tagName}>
        {labelName}
      </label>
      {type === 'input' && (
        <input
          className={`${INPUT_STYPE}`}
          type='text'
          name={tagName}
          id={tagName}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={text}
        />
      )}
      {type === 'textarea' && <TextEditor content={text} handleChange={handleChange} />}
    </div>
  );
}
