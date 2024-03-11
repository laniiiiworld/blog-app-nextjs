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
  removeComment: (commentId: string) => {},
});

export function CommentsContextProvider({ postId, children }: Props) {
  const {
    commentQuery: { data: comments },
    addComment: add,
    removeComment: remove,
  } = useComments(postId);

  const addComment = ({ content, user }: { content: string; user: User }) => {
    add.mutate({ postId, content, user });
  };

  const removeComment = (commentId: string) => {
    remove.mutate({ postId, commentId });
  };

  return (
    <CommentsContext.Provider value={{ postId, comments, addComment, removeComment }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useCommentsContext() {
  return useContext(CommentsContext);
}
