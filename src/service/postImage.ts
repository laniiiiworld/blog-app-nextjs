import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import { findImageUrls } from '@/util/parse';
import { getPostContent } from './post';

export async function getPostImage(type: 'content' | 'thumbnail', postId: string, name: string) {
  try {
    const url = type === 'content' ? `images/${postId}/` : `images/${postId}/thumbnail/`;
    const storageRef = ref(storage, url + name);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log(error);
  }
  return '';
}

export async function addPostImage(postId: string, file: File) {
  try {
    const metadata = {
      contentType: file.type,
      cacheControl: 'public, max-age=300', // 5분
    };
    const storageRef = ref(storage, `images/${postId}/` + file.name);
    const uploadResult = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    return downloadURL;
  } catch (error) {
    console.log(error);
  }
  return '';
}

export async function removeUnusedImages(postId: string, content?: string) {
  try {
    if (content === undefined) {
      content = await getPostContent(postId);
    }
    const imageUrls = findImageUrls(content);
    const folderRef = ref(storage, `images/${postId}/`);
    const { items } = await listAll(folderRef);
    const deletePromises = [];
    for (const item of items) {
      const url = await getDownloadURL(item);
      if (!imageUrls.includes(url)) {
        deletePromises.push(deleteObject(item));
      }
    }
    await Promise.all(deletePromises);
  } catch (error) {
    console.log(error);
  }
}

export async function removeAllImages(postId: string) {
  try {
    const folderRef = ref(storage, `images/${postId}/`);
    const { items } = await listAll(folderRef);
    const deletePromises = items.map((item) => deleteObject(item));
    await Promise.all(deletePromises);
  } catch (error) {
    console.log(error);
  }
}
