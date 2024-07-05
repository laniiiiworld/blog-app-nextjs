import { useRef } from 'react';
import { checkFileExtension, checkMaxFileSize } from '@/util/imageFileValidation';
import { usePostFormContext } from '@/context/PostFormContext';
import BackgroundThumbnail from './BackgroundThumbnail';

export default function ThumbnailToUpload() {
  const { form, thumbnail, handleThumbnail } = usePostFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileSelect = () => {
    const file = fileInputRef.current?.files && fileInputRef.current.files[0];

    if (!file) return;
    if (!checkFileExtension(file.type) || !checkMaxFileSize(file.size, 5)) {
      handleCancel();
      return;
    }

    handleThumbnail(file);
  };

  const handleCancel = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    handleThumbnail(undefined);
  };

  return (
    <>
      <input ref={fileInputRef} type='file' onChange={handleFileSelect} className='hidden' />
      <div className='mt-5'>
        <div className='flex justify-between'>
          <label className='block mb-2 text-slate-900 text-lg' htmlFor='thumbnail'>
            썸네일 설정
          </label>
          {(form.thumbnail || thumbnail) && (
            <div className='flex gap-2 text-gray-500 text-sm'>
              <button onClick={onClick} className='hover:underline'>
                재업로드
              </button>
              <button onClick={handleCancel} className='hover:underline'>
                취소
              </button>
            </div>
          )}
        </div>
        <BackgroundThumbnail postId={form.id} prevThumbnail={form.thumbnail} imageFile={thumbnail}>
          {!form.thumbnail && !thumbnail && (
            <button onClick={onClick} className='bg-white text-green-800 shadow-sm py-2 px-4 rounded hover:bg-slate-50'>
              썸네일 업로드
            </button>
          )}
        </BackgroundThumbnail>
      </div>
    </>
  );
}
