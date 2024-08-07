import { SimpleUser } from './user';

type SimplePostData = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  path: string;
  featured: boolean;
  thumbnail: string;
  writer: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type AdjacentPostData = Pick<SimplePostData, 'id' | 'title' | 'path' | 'thumbnail'>;

export type PostCardData = SimplePostData & {
  likesCount: number;
  repliesCount: number;
};

export type FullPostData = SimplePostData & {
  content: string;
};

export type PostFormData = Omit<FullPostData, 'tags'> & { newTag: string };

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
