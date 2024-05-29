import { useCommentsContext } from '@/context/CommentsContext';
import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import PopUp from './PopUp';
import useComments from '@/hooks/useComments';

export default function CommentDeletePopup() {
  const { postId, path } = useCommentsContext();
  const { removeComment } = useComments(postId, path);
  const { popupType, value: deleted, setValue: setDeleted } = usePopUpContext();

  if (popupType !== ('confirm' as PopupType)) return <></>;

  return (
    <PopUp
      handleConfirm={() => {
        removeComment.mutate({ commentId: deleted });
        setDeleted('');
      }}
      width={'w-80'}
    >
      <>
        <h3 className='text-xl font-semibold'>댓글 삭제</h3>
        <span>댓글을 정말로 삭제하시겠습니까?</span>
      </>
    </PopUp>
  );
}
