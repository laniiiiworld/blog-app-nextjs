'use client';

import Categories from '@/components/Categories';
import PostsGrid from '@/components/PostsGrid';
import { Post } from '@/service/posts';
import { useState } from 'react';

type Props = {
  posts: Post[];
  categories: string[];
};

export const SELECT_ALL = 'All Posts';

export default function FilteredPostList({ posts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(SELECT_ALL);
  const filteredPosts =
    selectedCategory === SELECT_ALL //
      ? posts
      : posts.filter((post) => post.category === selectedCategory);
  const handleCategoryClick = (category: string) => setSelectedCategory(category);

  return (
    <article className='flex'>
      <PostsGrid posts={filteredPosts} />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />
    </article>
  );
}
