import { usePostFormContext } from '@/context/PostFormContext';
import { pushNotification } from '@/util/notification';
import { makePostPath } from '@/util/parse';
import { validateBeforeWriting } from '@/util/validation';
import PopUpButton from './ui/PopUpButton';
import { usePost } from '@/hooks/usePost';
import { useRouter } from 'next/navigation';

type Props = {
  isAdding: boolean;
};

export default function TemporarySaveButton({ isAdding }: Props) {
  const router = useRouter();
  const { savedPosts, addPost, updatePost } = usePost({ path: 'SAVEDPOSTS' });
  const { form, tags } = usePostFormContext();
  const handleSave = () => {
    if (!validateBeforeWriting('saved', form)) return;

    const mutation = isAdding ? addPost : updatePost;
    mutation.mutate(
      { form: { ...form, postType: 'saved' }, tags },
      {
        onSuccess: () => {
          pushNotification('success', '포스트가 임시저장되었습니다.');
          router.push(`/write/${form.path || makePostPath(form.title)}`);
        },
        onError: (error: Error) => pushNotification('error', error.message),
      }
    );
  };
  const showSavedPosts = () => {};

  return (
    <>
      <div className='border border-green-800'>
        <PopUpButton type='cancle' name='임시저장' handleClick={handleSave} />
        <span className='text-green-800'>|</span>
        <PopUpButton type='cancle' name={String(savedPosts.length)} handleClick={showSavedPosts} />
      </div>
    </>
  );
}
