'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FullPostData, POST_DEFAULT_DATA, PostFormData } from '@/model/post';
import PostFormTagList from './PostFormTagList';
import { usePost } from '@/hooks/usePost';
import { pushNotification } from '@/util/notification';
import { useRouter } from 'next/navigation';

const LABEL_STYLE = 'block mb-2 text-slate-900 text-lg';
const INPUT_STYPE = 'block mx-auto p-2 text-base rounded border border-border-light w-full max-w-2xl outline-none';
const REQUIRED_STYLE =
  "after:content-[''] after:inline-block after:ml-2 after:w-2 after:h-2 after:rounded-full after:bg-orange-400";

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
    if (isAdding) {
      addPost.mutate(
        { form, tags },
        {
          onSuccess: handleSubmitSuccess,
          onError: handleSubmitError,
        }
      );
    } else {
      updatePost.mutate(
        { form, tags },
        {
          onSuccess: handleSubmitSuccess,
          onError: handleSubmitError,
        }
      );
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleTagDelete = (tag: string) => {
    setTags((prev) => prev.filter((v) => v !== tag));
  };

  return (
    <form onSubmit={onSubmit} className='mt-10 mx-auto max-w-2xl p-5'>
      <div className='mt-5'>
        <label className={`${LABEL_STYLE} ${REQUIRED_STYLE}`} htmlFor='title'>
          제목
        </label>
        <input
          className={`${INPUT_STYPE}`}
          type='text'
          name='title'
          id='title'
          required
          onChange={handleChange}
          value={form.title}
        />
      </div>
      <div className='mt-5'>
        <label className={`${LABEL_STYLE} ${REQUIRED_STYLE}`} htmlFor='title'>
          path
        </label>
        <input
          className={`${INPUT_STYPE}`}
          type='text'
          name='path'
          id='path'
          required
          disabled={!isAdding}
          onChange={handleChange}
          value={form.path}
        />
      </div>
      <div className='mt-5'>
        <label className={`${LABEL_STYLE}`} htmlFor='tags'>
          Tags
        </label>
        <input
          className={`${INPUT_STYPE}`}
          type='text'
          name='newTag'
          id='newTag'
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (tags.length === 5) {
                pushNotification('warning', '태그는 5개까지 입력 가능합니다.');
                return;
              }
              !tags.includes(form.newTag) && setTags((prev) => [...prev, form.newTag]);
              setForm((prev) => ({ ...prev, newTag: '' }));
            }
          }}
          value={form.newTag}
        />
        {tags.length > 0 && <PostFormTagList tags={tags} handleTagDelete={handleTagDelete} />}
      </div>
      <div className='mt-5'>
        <label className={`${LABEL_STYLE}`} htmlFor='description'>
          설명
        </label>
        <input
          className={`${INPUT_STYPE}`}
          type='text'
          name='description'
          id='description'
          onChange={handleChange}
          value={form.description}
        />
      </div>
      <div className='mt-5'>
        <label className={`${LABEL_STYLE} ${REQUIRED_STYLE}`} htmlFor='content'>
          내용
        </label>
        <textarea
          className={`${INPUT_STYPE} min-h-80`}
          name='content'
          id='content'
          required
          onChange={handleChange}
          value={form.content}
        ></textarea>
      </div>
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
