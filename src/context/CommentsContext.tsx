'use client';

import { Comment } from '@/model/post';
import useComments from '@/hooks/useComments';
import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
  postId: string;
  children: ReactNode;
};

const CommentsContext = createContext({
  postId: '',
  comments: [] as Comment[] | undefined,
  edited: '',
  setEdited: (value: string) => {},
  addComment: ({ content }: { content: string }) => {},
  updateComment: ({ content }: { content: string }) => {},
  removeComment: (commentId: string) => {},
  isLoading: false,
});

export function CommentsContextProvider({ postId, children }: Props) {
  const {
    commentQuery: { data: comments, isLoading },
    addComment: add,
    updateComment: update,
    removeComment: remove,
  } = useComments(postId);
  const [edited, setEdited] = useState('');

  const addComment = ({ content }: { content: string }) => {
    add.mutate({ postId, content });
  };

  const updateComment = ({ content }: { content: string }) => {
    const comment = comments?.find((item) => item.id === edited) as Comment;
    update.mutate({ postId, comment: { ...comment, content } });
  };

  const removeComment = (commentId: string) => {
    remove.mutate({ postId, commentId });
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
