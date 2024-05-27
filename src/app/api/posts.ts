import { CommentData } from '@/model/post';
import { FullUser } from '@/model/user';
import { firebaseDB } from '@/service/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';

export async function getPostComments(postId: string): Promise<[] | CommentData[]> {
  try {
    const commentsRef = collection(firebaseDB, 'posts', postId, 'comments');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
    const datas = await getDocs(commentsQuery);

    return await Promise.all(
      datas.docs.map(async (doc) => {
        const data = doc.data();
        const userRef = data.user;
        if (userRef) {
          const user = (await getDoc(userRef)).data() as FullUser;
          return { ...data, user } as CommentData;
        }
        return doc.data() as CommentData;
      })
    );
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function addPostComment(postId: string, comment: CommentData, user: FullUser) {
  try {
    const userRef = doc(firebaseDB, 'users', user.uid);
    return await setDoc(doc(firebaseDB, 'posts', postId, 'comments', comment.id), {
      ...comment,
      user: userRef,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updatePostComment(postId: string, comment: CommentData, user: FullUser) {
  try {
    const userRef = doc(firebaseDB, 'users', user.uid);
    return await setDoc(doc(firebaseDB, 'posts', postId, 'comments', comment.id), {
      ...comment,
      user: userRef,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function removePostComment(postId: string, commentId: string) {
  return await deleteDoc(doc(firebaseDB, 'posts', postId, 'comments', commentId));
}
