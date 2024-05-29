import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseDB } from './firebase';
import { getAllPostsSize } from './posts';

export const SELECT_ALL = 'All Posts';

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
