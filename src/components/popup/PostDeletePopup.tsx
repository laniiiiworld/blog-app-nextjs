import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import { usePost } from '@/hooks/usePost';
import PopUp from './PopUp';
import { useRouter } from 'next/navigation';

type Props = {
  postId: string;
  path: string;
};

export default function PostDeletePopup({ postId, path }: Props) {
  const { removePost } = usePost({ path });
  const { popupType } = usePopUpContext();
  const router = useRouter();

  if (popupType !== ('confirm' as PopupType)) return <></>;

  return (
    <PopUp
      handleConfirm={() => {
        removePost.mutate({ postId });
        router.push('/');
      }}
      width={'w-80'}
    >
      <>
        <h3 className='text-xl font-semibold'>게시물 삭제</h3>
        <span>게시물을 정말로 삭제하시겠습니까?</span>
      </>
    </PopUp>
  );
}
