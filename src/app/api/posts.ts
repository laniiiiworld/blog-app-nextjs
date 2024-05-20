import { Comment, PostCardData } from '@/model/post';
import { FullUser } from '@/model/user';
import { firebaseDB } from '@/service/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';

export async function getPosts(): Promise<PostCardData[] | []> {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const postsQuery = query(postsRef, orderBy('date', 'asc'));
    const datas = await getDocs(postsQuery);
    return Promise.all(
      datas.docs.map(async (doc) => {
        const post = doc.data() as PostCardData;
        const commentsRef = collection(doc.ref, 'comments');
        const comments = await getDocs(commentsRef);
        return { ...post, repliesCount: comments.size };
      })
    );
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function getPostComments(postId: string): Promise<[] | Comment[]> {
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
          return { ...data, user } as Comment;
        }
        return doc.data() as Comment;
      })
    );
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function addPostComment(postId: string, comment: Comment, user: FullUser) {
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

export async function updatePostComment(postId: string, comment: Comment, user: FullUser) {
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

export async function getPostLikes(postId: string): Promise<[] | string[]> {
  try {
    const likesRef = collection(firebaseDB, 'posts', postId, 'likes');
    const datas = await getDocs(likesRef);
    return datas?.docs.map((doc) => doc.data()?.userId);
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function plusLikeCount(postId: string, userId: string) {
  try {
    const likes: string[] = await getPostLikes(postId);
    if (likes.includes(userId)) return;
    await setDoc(doc(firebaseDB, 'posts', postId, 'likes', userId), { userId });
  } catch (error) {
    console.log(error);
  }
}

export async function minusLikeCount(postId: string, userId: string) {
  try {
    const likes: string[] = await getPostLikes(postId);
    if (!likes.includes(userId)) return;
    await deleteDoc(doc(firebaseDB, 'posts', postId, 'likes', userId));
  } catch (error) {
    console.log(error);
  }
}
