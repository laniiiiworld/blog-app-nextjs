import PostForm from '@/components/PostForm';
import { PostFormContextProvider } from '@/context/PostFormContext';

export default function AddPage() {
  return (
    <PostFormContextProvider>
      <PostForm isAdding={true} path='-' />
    </PostFormContextProvider>
  );
}
