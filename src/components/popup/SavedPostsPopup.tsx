import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import PopUp from './PopUp';
import { usePostFormContext } from '@/context/PostFormContext';
import { formatAgo } from '@/util/date';
import { FullPostData } from '@/model/post';
import { pushNotification } from '@/util/notification';
import { MouseEvent } from 'react';
import { MdClose } from 'react-icons/md';
import { usePost } from '@/hooks/usePost';
import { useRouter } from 'next/navigation';
import { hasNoContent, validateBeforeWriting } from '@/util/validation';

type Props = {
  isAdding: boolean;
};

export default function SavedPostsPopup({ isAdding }: Props) {
  const router = useRouter();
  const { popupType, setPopupType } = usePopUpContext();
  const { form, tags } = usePostFormContext();
  const { savedPosts, addPost, updatePost, removePost } = usePost({ path: 'SAVEDPOSTS' });
  const applyPost = (post: FullPostData) => {
    if (form.id === post.id) {
      pushNotification('warning', '현재 편집중인 문서입니다.');
      return;
    }

    if (isAdding && hasNoContent(form)) {
      setPopupType('');
      router.push(`/write/${post.path}`);
      return;
    }
    if (!confirm('작성 중인 내용을 임시저장하고 선택한 문서를 불러오시겠습니까?')) return;
    if (!validateBeforeWriting('saved', form)) return;

    const mutation = isAdding ? addPost : updatePost;
    mutation.mutate(
      { form: { ...form, postType: 'saved' }, tags },
      {
        onSuccess: () => {
          pushNotification('success', '포스트가 임시저장되었습니다.');
          setPopupType('');
          router.push(`/write/${post.path}`);
        },
        onError: (error: Error) => pushNotification('error', error.message),
      }
    );
  };
  const handleDelete = (e: MouseEvent<HTMLButtonElement>, post: FullPostData) => {
    e.stopPropagation();
    if (!confirm('선택된 임시저장 글을 삭제하시겠습니까?\n삭제된 글은 복구되지 않습니다.')) return;
    removePost.mutate(
      { postId: post.id },
      {
        onSuccess: () => pushNotification('success', '임시작성 글이 삭제되었습니다.'),
        onError: (error: Error) => pushNotification('error', error.message),
      }
    );
  };

  if (popupType !== ('savedPosts' as PopupType)) return <></>;

  return (
    <PopUp width={'w-full max-w-[768px] px-0'}>
      <div className='text-left'>
        <div className='flex gap-4 justify-between py-4 px-6 border-b border-border-light'>
          <h3 className='text-xl font-semibold'>{savedPosts.length}개의 임시저장 글</h3>
          <button
            onClick={() => setTimeout(() => setPopupType(''), 0)}
            className='text-2xl duration-300 hover:rotate-90'
          >
            <MdClose />
          </button>
        </div>
        <ul className='h-[500px] overflow-auto overscroll-contain'>
          {savedPosts.length === 0 && <div className='px-4 py-2'>임시저장 된 글이 없습니다.</div>}
          {savedPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => applyPost(post)}
              className='py-4 px-6 border-b border-border-light cursor-pointer hover:bg-gray-50'
            >
              <div className='flex justify-between py-2 whitespace-nowrap'>
                <h4 className='text-ellipsis overflow-hidden'>{post.title}</h4>
                <div className='text-sm'>
                  {form.id === post.id && <span className='text-green-600'>작성중</span>}
                  {form.id !== post.id && (
                    <button onClick={(e) => handleDelete(e, post)} className='text-gray-500 hover:underline'>
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <span className='text-sm text-gray-500'>{formatAgo(post.createdAt)}</span>
            </li>
          ))}
        </ul>
      </div>
    </PopUp>
  );
}
