'use client';

import { Comment, User } from '@/components/Comments';
import useComments from '@/hooks/useComments';
import { ReactNode, createContext, useContext, useState } from 'react';

type Props = {
  postId: string;
  children: ReactNode;
};

const CommentsContext = createContext({
  postId: '',
  comments: [] as Comment[] | undefined,
  addComment: ({ content, user }: { content: string; user: User }) => {},
});

export function CommentsContextProvider({ postId, children }: Props) {
  const {
    commentQuery: { data: comments },
    addComment: add,
  } = useComments(postId);

  const addComment = ({ content, user }: { content: string; user: User }) => {
    add.mutate({ postId, content, user });
  };

  return <CommentsContext.Provider value={{ postId, comments, addComment }}>{children}</CommentsContext.Provider>;
}

export function useCommentsContext() {
  return useContext(CommentsContext);
}
