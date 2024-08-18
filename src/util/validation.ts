import { PostFormData, PostType } from '@/model/post';
import { pushNotification } from './notification';

export function validateBeforeWriting(postType: PostType, form: PostFormData) {
  if (!form.title.trim()) {
    pushNotification('warning', '제목이 비어있습니다.');
    return false;
  }
  if (!form.content.trim()) {
    pushNotification('warning', '내용이 비어있습니다.');
    return false;
  }
  if (postType === 'posts' && !form.path.trim()) {
    pushNotification('warning', 'URL 설정이 비어있습니다.');
    return false;
  }

  return true;
}
