import { ChangeEvent, MutableRefObject } from 'react';
import TextEditorButton, { ButtonType } from './TextEditorButton';
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu';
import { FaBold, FaCode, FaImage, FaItalic, FaLink, FaQuoteRight, FaStrikethrough } from 'react-icons/fa6';
import { useListButtonContext } from '@/context/ListButtonContext';

type Props = {
  contentRef: MutableRefObject<HTMLTextAreaElement | null>;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export default function TextEditorButtons({ contentRef, handleChange }: Props) {
  const { isList } = useListButtonContext();

  const handleHeadingClick = (type: ButtonType) => {
    console.log(type);
  };
  const handleBoldClick = () => {};
  const handleItalicClick = () => {};
  const handleStrikeThroughClick = () => {};
  const handleQuoteClick = () => {};
  const handleLinkClick = () => {};
  const handleImageClick = () => {};
  const handleCodeBlockClick = () => {};

  return (
    <ul
      className={`flex gap-2 p-1 top-12 rounded-xl ${
        isList && 'absolute flex-col right-3 border-border-light bg-white shadow-md'
      }`}
    >
      <TextEditorButton type='h1' icon={<LuHeading1 />} handleClick={handleHeadingClick} />
      <TextEditorButton type='h2' icon={<LuHeading2 />} handleClick={handleHeadingClick} />
      <TextEditorButton type='h3' icon={<LuHeading3 />} handleClick={handleHeadingClick} />
      <TextEditorButton type='h4' icon={<LuHeading4 />} handleClick={handleHeadingClick} hasLine={true} />
      <TextEditorButton type='bold' icon={<FaBold />} handleClick={handleBoldClick} />
      <TextEditorButton type='italic' icon={<FaItalic />} handleClick={handleItalicClick} />
      <TextEditorButton
        type='strikethrough'
        icon={<FaStrikethrough />}
        handleClick={handleStrikeThroughClick}
        hasLine={true}
      />
      <TextEditorButton type='quote' icon={<FaQuoteRight />} handleClick={handleQuoteClick} />
      <TextEditorButton type='link' icon={<FaLink />} handleClick={handleLinkClick} />
      <TextEditorButton type='image' icon={<FaImage />} handleClick={handleImageClick} />
      <TextEditorButton type='code' icon={<FaCode />} handleClick={handleCodeBlockClick} />
    </ul>
  );
}
