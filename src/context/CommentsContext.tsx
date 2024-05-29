'use client';

import { CommentData } from '@/model/post';
import useComments from '@/hooks/useComments';
import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
  postId: string;
  path: string;
  children: ReactNode;
};

const CommentsContext = createContext({
  postId: '',
  comments: [] as CommentData[],
  edited: '',
  setEdited: (value: string) => {},
  addComment: ({ content }: { content: string }) => {},
  updateComment: ({ content }: { content: string }) => {},
  removeComment: (commentId: string) => {},
  isLoading: false,
});

export function CommentsContextProvider({ postId, path, children }: Props) {
  const {
    comments,
    isLoading,
    addComment: add,
    updateComment: update,
    removeComment: remove,
  } = useComments(postId, path);
  const [edited, setEdited] = useState('');

  const addComment = ({ content }: { content: string }) => {
    add.mutate({ content });
  };

  const updateComment = ({ content }: { content: string }) => {
    const comment = comments?.find((item) => item.id === edited) as CommentData;
    update.mutate({ comment: { ...comment, content } });
  };

  const removeComment = (commentId: string) => {
    remove.mutate({ commentId });
  };

  return (
    <CommentsContext.Provider
      value={{ postId, comments, edited, setEdited, addComment, updateComment, removeComment, isLoading }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export function useCommentsContext() {
  return useContext(CommentsContext);
}
