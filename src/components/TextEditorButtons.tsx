import { ChangeEvent, MutableRefObject, ReactNode } from 'react';
import TextEditorButton, { SelectionType } from './TextEditorButton';
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu';
import { FaBold, FaCode, FaImage, FaItalic, FaLink, FaQuoteRight, FaStrikethrough } from 'react-icons/fa6';
import { useListButtonContext } from '@/context/ListButtonContext';

type Props = {
  contentRef: MutableRefObject<HTMLTextAreaElement | null>;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};
type ButtonType = 'h1' | 'h2' | 'h3' | 'h4' | 'bold' | 'italic' | 'strikethrough' | 'quote' | 'link' | 'image' | 'code';
type ButtonConfig = {
  type: ButtonType;
  icon: ReactNode;
  selectionType: SelectionType;
  regexp: RegExp;
  markdown: string;
  hasLine?: boolean;
};

const buttonConfigs: ButtonConfig[] = [
  { type: 'h1', icon: <LuHeading1 />, selectionType: 'line', regexp: /^#+\s*/g, markdown: '# ' },
  { type: 'h2', icon: <LuHeading2 />, selectionType: 'line', regexp: /^#+\s*/g, markdown: '## ' },
  { type: 'h3', icon: <LuHeading3 />, selectionType: 'line', regexp: /^#+\s*/g, markdown: '### ' },
  { type: 'h4', icon: <LuHeading4 />, selectionType: 'line', regexp: /^#+\s*/g, markdown: '#### ', hasLine: true },
  { type: 'bold', icon: <FaBold />, selectionType: 'part', regexp: /^\*+|\*+$/g, markdown: '**' },
  { type: 'italic', icon: <FaItalic />, selectionType: 'part', regexp: /^_+|_+$/g, markdown: '_' },
  {
    type: 'strikethrough',
    icon: <FaStrikethrough />,
    selectionType: 'part',
    regexp: /^\~+|\~+$/g,
    markdown: '~~',
    hasLine: true,
  },
  { type: 'quote', icon: <FaQuoteRight />, selectionType: 'line', regexp: /^>\s*/g, markdown: '> ' },
  { type: 'link', icon: <FaLink />, selectionType: 'link', regexp: /^\[.*\]\(.*\)$/g, markdown: '[텍스트](url)' },
  { type: 'image', icon: <FaImage />, selectionType: 'link', regexp: /^\[.*\]\(.*\)$/g, markdown: '![텍스트]()' },
  { type: 'code', icon: <FaCode />, selectionType: 'code', regexp: /^\`\`\`+|\`\`\`+$/g, markdown: '```' },
];

export default function TextEditorButtons({ contentRef, handleChange }: Props) {
  const { isList } = useListButtonContext();

  return (
    <ul
      className={`flex gap-2 p-1 top-12 rounded-xl ${
        isList && 'absolute flex-col right-3 border-border-light bg-white shadow-md'
      }`}
    >
      {buttonConfigs.map(({ type, icon, selectionType, regexp, markdown, hasLine }) => (
        <TextEditorButton
          key={type}
          icon={icon}
          contentRef={contentRef}
          selectionType={selectionType}
          regexp={regexp}
          markdown={markdown}
          handleChange={handleChange}
          hasLine={hasLine}
        />
      ))}
    </ul>
  );
}
