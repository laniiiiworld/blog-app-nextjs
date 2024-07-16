import { FullPostData } from '@/model/post';
import { getIdTokenAsync } from '@/service/auth';

export async function fetchWithAuth(url: string, options: RequestInit, errorMessage: string = 'Request failed') {
  const token = await getIdTokenAsync();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorMessage);
  }

  return await response.json();
}

export function createPostFormData(post: FullPostData, thumbnail?: File) {
  const formData = new FormData();
  formData.append('post', JSON.stringify(post));
  thumbnail && formData.append('thumbnail', thumbnail);
  return formData;
}
