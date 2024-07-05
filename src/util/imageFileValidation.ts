import { pushNotification } from './notification';

export function checkFileExtension(type: string) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];
  const isImageFile = allowedTypes.includes(type);

  if (isImageFile) return true;

  pushNotification('error', '이미지 파일(jpg, jpeg, png, gif)만 업로드 가능합니다.');
  return false;
}

export function checkMaxFileSize(size: number, maxFileSizeMB: number) {
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  if (size <= maxFileSizeBytes) return true;

  pushNotification('error', `이미지 파일 크기는 ${maxFileSizeMB}MB를 초과할 수 없습니다.`);
  return false;
}
