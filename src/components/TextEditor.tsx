'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import MarkdownViewr from './MarkdownViewr';
import TextEditorTab from './TextEditorTab';

type Props = {
  content: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  INPUT_STYPE: string;
};
export type ViewType = 'write' | 'preview' | 'all';
const viewTypes: { [key in ViewType]: ViewType } = {
  write: 'write',
  preview: 'preview',
  all: 'all',
};
const MAX_WIDTH_TO_SHOW_TABS = 1024;
const BORDER_BOTTOM_STYLE = 'after:content-"" after:w-full after:h-[1px] after:mt-12 after:bg-border-light';
const HEIGHT_STYLE = 'h-96 md:h-[480px] lg:h-[720px]';

export default function TextEditor({ content, handleChange, INPUT_STYPE }: Props) {
  const [clicked, setClicked] = useState<ViewType>('all');
  const handleTabClick = (e: MouseEvent<HTMLElement>) => {
    const target = e.target;
    target instanceof HTMLLIElement && setClicked(target.textContent as ViewType);
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
    <>
      <ul
        onClick={handleTabClick}
        className={`flex lg:hidden text-slate-600 bg-gray-100 border border-b-0 border-border-light rounded-t-lg overflow-hidden ${BORDER_BOTTOM_STYLE}`}
      >
        <TextEditorTab type={viewTypes.write} clicked={clicked} />
        <TextEditorTab type={viewTypes.preview} clicked={clicked} />
      </ul>
      <ul
        className={`block lg:flex border border-t-0 lg:border-t ${HEIGHT_STYLE} ${
          clicked !== 'write' && 'overflow-y-auto lg:overflow-hidden'
        }`}
      >
        {clicked !== 'preview' && (
          <li className='p-4 h-full lg:basis-1/2 lg:p-0'>
            <textarea
              className={`${INPUT_STYPE} h-full resize-none lg:border-0 lg:border-r`}
              name='content'
              id='content'
              required
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
    </>
  );
}
