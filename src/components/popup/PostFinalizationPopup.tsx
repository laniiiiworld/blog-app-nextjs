import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import PopUp from './PopUp';
import PostFormItem from '../PostFormItem';
import { useRouter } from 'next/navigation';
import { usePost } from '@/hooks/usePost';
import { usePostFormContext } from '@/context/PostFormContext';
import { pushNotification } from '@/util/notification';
import { ChangeEvent } from 'react';
import PopUpButton from '../ui/PopUpButton';
import ThumbnailToUpload from '../ThumbnailToUpload';
import { validateBeforeWriting } from '@/util/validation';

type Props = {
  isAdding: boolean;
  path: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export default function PostFinalizationPopup({ isAdding, path, handleChange }: Props) {
  const router = useRouter();
  const { popupType, setPopupType } = usePopUpContext();
  const { form, handleForm, tags, thumbnail } = usePostFormContext();
  const { addPost, updatePost } = usePost({ path, enabled: false });
  const isUpdating = !isAdding && form.postType === 'posts';
  const handleSubmitSuccess = () => {
    router.push(`/posts/${form.path}`);
    handleForm({});
    setTimeout(() => setPopupType(''), 0);
  };
  const handleSubmitError = (error: Error) => {
    pushNotification('error', error.message);
  };
  const onSubmit = () => {
    if (!validateBeforeWriting('posts', form)) return;

    const mutation = isUpdating ? updatePost : addPost;
    mutation.mutate(
      { form: { ...form, postType: 'posts' }, tags, thumbnail },
      {
        onSuccess: handleSubmitSuccess,
        onError: handleSubmitError,
      }
    );
  };

  if (popupType !== ('postWrite' as PopupType)) return <></>;

  return (
    <PopUp width={'w-96'}>
      <>
        <h3 className='text-xl font-semibold'>포스트 미리보기</h3>
        <PostFormItem
          type='input'
          labelName='URL 설정'
          tagName='path'
          text={form.path}
          disabled={!isAdding}
          required={true}
          handleChange={handleChange}
        />
        <ThumbnailToUpload />
        <PostFormItem
          type='input'
          labelName='설명'
          tagName='description'
          text={form.description}
          placeholderText='포스트를 짧게 소개해보세요'
          handleChange={handleChange}
        />
        <div className='flex gap-4 justify-end mt-4'>
          <PopUpButton type='cancle' name='취소' handleClick={() => setTimeout(() => setPopupType(''), 0)} />
          <PopUpButton type='confirm' name={`${isUpdating ? '수정' : '작성'}`} handleClick={onSubmit} />
        </div>
      </>
    </PopUp>
  );
}