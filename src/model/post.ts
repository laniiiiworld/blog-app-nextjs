import { SimpleUser } from './user';

type SimplePostData = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  path: string;
  featured: boolean;
  isImage: boolean;
};

export type AdjacentPostData = Pick<SimplePostData, 'title' | 'path' | 'isImage'>;

export type PostCardData = SimplePostData & {
  likesCount: number;
  repliesCount: number;
};

export type FullPostData = SimplePostData & {
  content: string;
};

export type PostWithAdjacents = {
  post: FullPostData | null;
  prevPost: AdjacentPostData | null;
  nextPost: AdjacentPostData | null;
};

export type CommentData = {
  postId: string;
  id: string;
  content: string;
  createdAt: string;
  user: SimpleUser;
};

export type SimpleCommentData = Omit<CommentData, 'user'>;
