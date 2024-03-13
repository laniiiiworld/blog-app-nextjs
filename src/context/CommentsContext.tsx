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
  edited: '',
  setEdited: (value: string) => {},
  addComment: ({ content, user }: { content: string; user: User }) => {},
  updateComment: ({ content }: { content: string }) => {},
  removeComment: (commentId: string) => {},
});

export function CommentsContextProvider({ postId, children }: Props) {
  const {
    commentQuery: { data: comments },
    addComment: add,
    updateComment: update,
    removeComment: remove,
  } = useComments(postId);
  const [edited, setEdited] = useState('');

  const addComment = ({ content, user }: { content: string; user: User }) => {
    add.mutate({ postId, content, user });
  };

  const updateComment = ({ content }: { content: string }) => {
    const comment = comments?.find((item) => item.id === edited) as Comment;
    update.mutate({ postId, comment: { ...comment, content } });
  };

  const removeComment = (commentId: string) => {
    remove.mutate({ postId, commentId });
  };

  return (
    <CommentsContext.Provider value={{ postId, comments, edited, setEdited, addComment, updateComment, removeComment }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useCommentsContext() {
  return useContext(CommentsContext);
}
