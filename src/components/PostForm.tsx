'use client';
import { ChangeEvent, KeyboardEvent } from 'react';
import PostFormTagList from './PostFormTagList';
import { pushNotification } from '@/util/notification';
import PostFormItem from './PostFormItem';
import { usePostFormContext } from '@/context/PostFormContext';
import { PostFormData } from '@/model/post';
import PostFinalizationPopup from './popup/PostFinalizationPopup';
import { usePopUpContext } from '@/context/PopUpContext';
import PopUpButton from './ui/PopUpButton';

type Props = {
  isAdding: boolean;
  path: string;
};

export default function PostForm({ isAdding, path }: Props) {
  const { setPopupType } = usePopUpContext();
  const { form, handleForm, tags, handleTags } = usePostFormContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleForm({ name: name as keyof PostFormData, value });
  };
  const handleTagAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tags.length === 5) {
        pushNotification('warning', '태그는 5개까지 입력 가능합니다.');
        return;
      }
      !tags.includes(form.newTag) && handleTags({ type: 'add' });
      handleForm({ name: 'newTag', value: '' });
    }
  };
  const handleTagDelete = (deleted: string) => handleTags({ type: 'delete', deleted });

  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-full mt-10 px-4'>
      <PostFinalizationPopup isAdding={isAdding} path={path} handleChange={handleChange} />
      <PostFormItem
        type='input'
        labelName='제목'
        tagName='title'
        text={form.title}
        required={true}
        handleChange={handleChange}
      />
      <PostFormItem
        type='input'
        labelName='Tags'
        tagName='newTag'
        text={form.newTag}
        placeholderText='태그를 입력하세요'
        handleChange={handleChange}
        handleKeyDown={handleTagAdd}
      />
      {tags.length > 0 && <PostFormTagList tags={tags} handleTagDelete={handleTagDelete} />}
      <PostFormItem
        type='textarea'
        labelName='내용'
        tagName='content'
        text={form.content}
        required={true}
        handleChange={handleChange}
      />
      <div className='mt-5 text-right'>
        <PopUpButton
          type='confirm'
          name={`${isAdding ? '작성' : '수정'}`}
          handleClick={() => setPopupType('postWrite')}
        />
      </div>
    </form>
  );
}
