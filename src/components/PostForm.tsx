'use client';
import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import PostFormTagList from './PostFormTagList';
import { usePost } from '@/hooks/usePost';
import { pushNotification } from '@/util/notification';
import { useRouter } from 'next/navigation';
import PostFormItem from './PostFormItem';
import { usePostFormContext } from '@/context/PostFormContext';
import { PostFormData } from '@/model/post';

type Props = {
  isAdding: boolean;
  path: string;
};

export default function PostForm({ isAdding, path }: Props) {
  const router = useRouter();
  const { form, handleForm, tags, handleTags } = usePostFormContext();
  const { addPost, updatePost } = usePost({ path, enabled: false });
  const handleSubmitSuccess = () => {
    router.push(`/posts/${form.path}`);
    handleForm({});
  };
  const handleSubmitError = (error: Error) => {
    pushNotification('error', error.message);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutation = isAdding ? addPost : updatePost;
    mutation.mutate(
      { form, tags },
      {
        onSuccess: handleSubmitSuccess,
        onError: handleSubmitError,
      }
    );
  };
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
    <form onSubmit={onSubmit} className='w-full mt-10 px-4'>
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
        labelName='path'
        tagName='path'
        text={form.path}
        disabled={!isAdding}
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
        type='input'
        labelName='설명'
        tagName='description'
        text={form.description}
        placeholderText='포스트를 짧게 소개해보세요'
        handleChange={handleChange}
      />
      <PostFormItem
        type='textarea'
        labelName='내용'
        tagName='content'
        text={form.content}
        required={true}
        handleChange={handleChange}
      />
      <div className='mt-5 text-right'>
        <input
          type='submit'
          value={`${isAdding ? '작성' : '수정'}`}
          className='bg-green-800 text-white rounded-sm px-4 py-2 cursor-pointer hover:brightness-125'
        />
      </div>
    </form>
  );
}
