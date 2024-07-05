import { getPostImage } from '@/service/postImage';
import { useQuery } from '@tanstack/react-query';

export function useThumbnail(postId: string, thumbnail: string) {
  const {
    data: imageUrl,
    isLoading,
    isError,
  } = useQuery<string, Error>({
    queryKey: ['thumbnail', postId, thumbnail],
    queryFn: () => (thumbnail ? getPostImage('thumbnail', postId, thumbnail) : ''),
  });

  return { imageUrl, isLoading, isError };
}
