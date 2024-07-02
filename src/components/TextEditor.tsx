'use client';

import { ChangeEvent, MouseEvent, useEffect, useState, useRef } from 'react';
import MarkdownViewr from './MarkdownViewr';
import TextEditorTab from './TextEditorTab';
import { INPUT_STYPE } from './PostFormItem';
import TextEditorButtons from './TextEditorButtons';
import ListButton from './ui/ListButton';
import { ListButtonContextProvider } from '@/context/ListButtonContext';

type Props = {
  content: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export type ViewType = 'write' | 'preview' | 'all';
const viewTypes: { [key in ViewType]: ViewType } = {
  write: 'write',
  preview: 'preview',
  all: 'all',
};
const MAX_WIDTH_TO_SHOW_TABS = 1024;
const HEIGHT_STYLE = 'h-96 md:h-[480px] lg:h-[720px]';

export default function TextEditor({ content, handleChange }: Props) {
  const [clicked, setClicked] = useState<ViewType>('all');
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTabClick = (e: MouseEvent<HTMLElement>) => {
    const target = e.target;
    if (target instanceof HTMLLIElement && target.textContent) {
      setClicked(target.textContent as ViewType);
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    const handleResize = () => {
      animationFrameId = requestAnimationFrame(() => {
        setClicked((prev) => {
          if (window.innerWidth >= MAX_WIDTH_TO_SHOW_TABS) return 'all';
          return prev === 'all' ? 'write' : prev;
        });
      });
    };

    window.addEventListener('resize', handleResize);
    setClicked(window.innerWidth >= MAX_WIDTH_TO_SHOW_TABS ? 'all' : 'write');

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className='relative'>
      <ul
        onClick={handleTabClick}
        className='flex text-slate-600 bg-gray-100 border border-b-0 border-border-light rounded-t-lg overflow-hidden'
      >
        {clicked !== 'all' && (
          <>
            <TextEditorTab type={viewTypes.write} clicked={clicked} />
            <TextEditorTab type={viewTypes.preview} clicked={clicked} />
          </>
        )}
        <li className='flex justify-end items-center w-full pr-4 border-b border-border-light'>
          {clicked === 'all' && <TextEditorButtons contentRef={contentRef} handleChange={handleChange} />}
          {clicked !== 'all' && (
            <ListButtonContextProvider>
              <ListButton>
                <TextEditorButtons contentRef={contentRef} handleChange={handleChange} />
              </ListButton>
            </ListButtonContextProvider>
          )}
        </li>
      </ul>
      <ul
        className={`block lg:flex border border-t-0 lg:border-t ${HEIGHT_STYLE} ${
          clicked !== 'write' && 'overflow-y-auto lg:overflow-hidden'
        }`}
      >
        {clicked !== 'preview' && (
          <li className='p-4 h-full lg:basis-1/2 lg:p-0'>
            <textarea
              ref={contentRef}
              className={`${INPUT_STYPE} h-full resize-none lg:border-0 lg:border-r`}
              name='content'
              id='content'
              onChange={handleChange}
              placeholder='내용을 입력하세요'
              value={content}
            ></textarea>
          </li>
        )}
        {clicked !== 'write' && (
          <li className='p-4 h-full lg:basis-1/2 lg:overflow-y-auto lg:bg-slate-50'>
            <MarkdownViewr content={content} />
          </li>
        )}
      </ul>
    </div>
  );
}
