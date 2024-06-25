'use client';

import { FullPostData, PostFormData } from '@/model/post';
import { ReactNode, createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const POST_DEFAULT_DATA: PostFormData = {
  id: '',
  title: '',
  description: '',
  newTag: '',
  path: '',
  featured: false,
  isImage: false,
  content: '',
  writer: '',
  createdAt: '',
  lastUpdatedAt: '',
};

type HandleFormParams = {
  name?: keyof PostFormData;
  value?: string;
};

type HandleTagsParams = {
  type: 'add' | 'delete';
  deleted?: string;
};

type ContextProps = {
  form: PostFormData;
  handleForm: ({ name, value }: HandleFormParams) => void;
  tags: string[];
  handleTags: ({ type, deleted }: HandleTagsParams) => void;
};

type Props = {
  post?: FullPostData;
  children: ReactNode;
};

const PostFormContext = createContext<ContextProps>({
  form: POST_DEFAULT_DATA,
  handleForm: ({ name, value }: HandleFormParams) => {},
  tags: [],
  handleTags: ({ type, deleted }: HandleTagsParams) => {},
});

export function PostFormContextProvider({ post, children }: Props) {
  const [form, setForm] = useState<PostFormData>(
    post ? { ...post, newTag: '' } : { ...POST_DEFAULT_DATA, id: uuidv4() }
  );
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const handleForm = ({ name, value }: HandleFormParams) => {
    if (name === undefined) {
      setForm(POST_DEFAULT_DATA);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleTags = ({ type, deleted }: HandleTagsParams) => {
    if (type === 'add') {
      setTags((prev) => [...prev, form.newTag]);
    } else {
      setTags((prev) => prev.filter((v) => v !== deleted));
    }
  };

  return <PostFormContext.Provider value={{ form, handleForm, tags, handleTags }}>{children}</PostFormContext.Provider>;
}

export function usePostFormContext() {
  return useContext(PostFormContext);
}
