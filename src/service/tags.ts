import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { firebaseDB } from './firebase';
import { getAllPostsSize } from './posts';
import { FullPostData } from '@/model/post';

export const SELECT_ALL = 'All Posts';

type TagData = { name: string; count: number };

export const getAllTags = async (): Promise<Map<string, number>> => {
  const tags = new Map<string, number>();
  try {
    const tagsRef = collection(firebaseDB, 'tags');
    const datas = await getDocs(query(tagsRef, orderBy('name', 'asc')));
    tags.set(SELECT_ALL, await getAllPostsSize());
    datas.docs.forEach((doc) => {
      tags.set(doc.id, doc.data().count as number);
    });
  } catch (error) {
    console.log(error);
  }
  return tags;
};

export async function getPostTags(postId: string): Promise<string[]> {
  try {
    const postRef = doc(firebaseDB, 'posts', postId);
    const postDoc = await getDoc(postRef);
    const post = postDoc.data() as FullPostData;
    return post?.tags || [];
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function updateTags(isAdding: boolean, postId: string, tagsToUpdate: string[]) {
  try {
    !isAdding && (await removeTags(postId));
    const tagPromises = tagsToUpdate.map(async (tag) => {
      const tagRef = doc(firebaseDB, 'tags', tag);
      const tagDoc = await getDoc(tagRef);
      const { name, count } = (tagDoc.data() || { name: tag, count: 0 }) as TagData;
      return setDoc(tagRef, { name, count: count + 1 });
    });
    await Promise.all(tagPromises);
  } catch (error) {
    throw new Error('Failed to update tags');
  }
}

export async function removeTags(postId: string) {
  try {
    const tagsToRemove = await getPostTags(postId);
    const tagPromises = tagsToRemove.map(async (tag) => {
      const tagRef = doc(firebaseDB, 'tags', tag);
      const tagDoc = await getDoc(tagRef);
      const { name, count } = tagDoc.data() as TagData;
      return count === 1 ? deleteDoc(tagRef) : setDoc(tagRef, { name, count: count - 1 });
    });
    await Promise.all(tagPromises);
  } catch (error) {
    throw new Error('Failed to remove tags');
  }
}
