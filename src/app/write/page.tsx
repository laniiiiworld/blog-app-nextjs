import PostForm from '@/components/PostForm';
import { PostFormContextProvider } from '@/context/PostFormContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '새 글 작성',
  description: '새로운 글을 작성해보세요.',
};

export default function AddPage() {
  return (
    <PostFormContextProvider>
      <PostForm isAdding={true} path='-' />
    </PostFormContextProvider>
  );
}
