'use client';

import { FullPostData, PostFormData } from '@/model/post';
import { removeUnusedImages } from '@/service/postImage';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const POST_DEFAULT_DATA: PostFormData = {
  id: '',
  title: '',
  description: '',
  newTag: '',
  path: '',
  featured: false,
  thumbnail: '',
  content: '',
  writer: '',
  createdAt: '',
  lastUpdatedAt: '',
};

type HandleFormParams = {
  name?: keyof PostFormData;
  value?: string;
  replacedValue?: string;
};

type HandleTagsParams = {
  type: 'add' | 'delete';
  deleted?: string;
};

type ContextProps = {
  form: PostFormData;
  handleForm: ({ name, value, replacedValue }: HandleFormParams) => void;
  tags: string[];
  handleTags: ({ type, deleted }: HandleTagsParams) => void;
  thumbnail: File | undefined;
  handleThumbnail: (imageFile?: File) => void;
};

type Props = {
  post?: FullPostData;
  children: ReactNode;
};

const PostFormContext = createContext<ContextProps>({
  form: POST_DEFAULT_DATA,
  handleForm: ({ name, value, replacedValue }: HandleFormParams) => {},
  tags: [],
  handleTags: ({ type, deleted }: HandleTagsParams) => {},
  thumbnail: undefined,
  handleThumbnail: () => {},
});

export function PostFormContextProvider({ post, children }: Props) {
  const [form, setForm] = useState<PostFormData>(
    post ? { ...post, newTag: '' } : { ...POST_DEFAULT_DATA, id: uuidv4() }
  );
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);

  const handleForm = ({ name, value, replacedValue = '' }: HandleFormParams) => {
    if (name === undefined) {
      setForm(POST_DEFAULT_DATA);
    } else if (name === 'content' && replacedValue) {
      setForm((prev) => ({ ...prev, ['content']: prev['content'].replace(value || '', replacedValue) }));
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
  const handleThumbnail = (imageFile?: File) => {
    setForm((prev) => ({ ...prev, ['thumbnail']: '' }));
    setThumbnail(imageFile);
  };

  useEffect(() => {
    return () => {
      form.id && (async () => await removeUnusedImages(form.id))();
    };
  }, [form.id]);

  return (
    <PostFormContext.Provider value={{ form, handleForm, tags, handleTags, thumbnail, handleThumbnail }}>
      {children}
    </PostFormContext.Provider>
  );
}

export function usePostFormContext() {
  return useContext(PostFormContext);
}
