import { User } from './user';

export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  path: string;
  featured: boolean;
  isImage: boolean;
  repliesCount: number;
};

export type PostData = Post & {
  content: string;
  prevPost: Post | null;
  nextPost: Post | null;
};

export type Comment = {
  postId: string;
  id: string;
  content: string;
  createdAt: string;
  user: User;
};
