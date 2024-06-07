'use client';
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { FullPostData, POST_DEFAULT_DATA, PostFormData } from '@/model/post';
import PostFormTagList from './PostFormTagList';
import { usePost } from '@/hooks/usePost';
import { pushNotification } from '@/util/notification';
import { useRouter } from 'next/navigation';
import PostFormItem from './PostFormItem';

type Props = {
  post?: FullPostData;
};

export default function PostForm({ post }: Props) {
  const router = useRouter();
  const isAdding = post?.path ? false : true;
  const { addPost, updatePost } = usePost({ path: post?.path || '-', enabled: false });
  const [form, setForm] = useState<PostFormData>(post ? { ...post, newTag: '' } : POST_DEFAULT_DATA);
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const handleSubmitSuccess = () => {
    router.push(`/posts/${form.path}`);
    setForm(POST_DEFAULT_DATA);
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleTagAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tags.length === 5) {
        pushNotification('warning', '태그는 5개까지 입력 가능합니다.');
        return;
      }
      !tags.includes(form.newTag) && setTags((prev) => [...prev, form.newTag]);
      setForm((prev) => ({ ...prev, newTag: '' }));
    }
  };
  const handleTagDelete = (tag: string) => {
    setTags((prev) => prev.filter((v) => v !== tag));
  };

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
