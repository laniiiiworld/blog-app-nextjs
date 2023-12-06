import PostList from '@/components/PostList';
import { Post } from '@/service/posts';

type Props = {
  posts: Post[];
};

export default function FeaturedPostList({ posts }: Props) {
  const filteredPosts = posts.filter((post) => post.featured === true);

  return <PostList posts={filteredPosts} />;
}
