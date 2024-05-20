import { FullUser } from './user';

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

export type PostCardData = SimplePostData & {
  repliesCount: number;
};

export type FullPostData = SimplePostData & {
  content: string;
  prevPost: Post | null;
  nextPost: Post | null;
};

export type Comment = {
  postId: string;
  id: string;
  content: string;
  createdAt: string;
  user: FullUser;
};
