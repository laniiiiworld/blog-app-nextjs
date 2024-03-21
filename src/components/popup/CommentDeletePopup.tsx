import { useCommentsContext } from '@/context/CommentsContext';
import { PopupType, usePopUpContext } from '@/context/PopUpContext';
import PopUp from './PopUp';

export default function CommentDeletePopup() {
  const { removeComment } = useCommentsContext();
  const { popupType, value: deleted, setValue: setDeleted } = usePopUpContext();

  if (popupType !== ('confirm' as PopupType)) return <></>;

  return (
    <PopUp
      handleConfirm={() => {
        removeComment(deleted);
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
