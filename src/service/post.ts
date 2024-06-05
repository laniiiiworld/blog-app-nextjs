import { firebaseDB } from './firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { AdjacentPostData, CommentData, FullPostData, PostWithAdjacents, SimpleCommentData } from '@/model/post';
import { SimpleUser } from '@/model/user';

export async function getPostWithAdjacents(path: string): Promise<PostWithAdjacents | null> {
  try {
    const post = await getPost(path);

    if (!post) return { post: null, prevPost: null, nextPost: null };

    const prevPostPromise = getAdjacentPost(post.id, post.date, true);
    const nextPostPromise = getAdjacentPost(post.id, post.date, false);
    const [prevPost, nextPost] = await Promise.all([prevPostPromise, nextPostPromise]);

    return { post, prevPost, nextPost };
  } catch (error) {
    console.log(error);
  }
  return { post: null, prevPost: null, nextPost: null };
}

export async function getPost(path: string): Promise<FullPostData | null> {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const posts = await getDocs(query(postsRef, where('path', '==', path)));
    const post = posts.docs[0].data() as FullPostData;
    return { ...post };
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function getAdjacentPost(postId: string, date: string, isPrev: boolean) {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const postsQuery = query(postsRef, ...makeAdjacentPostsQuery(postId, date, isPrev));
    const data = await getDocs(postsQuery);
    return (data.docs[0]?.data() as AdjacentPostData) || null;
  } catch (error) {
    console.log(error);
  }
  return null;
}

function makeAdjacentPostsQuery(postId: string, date: string, isPrev: boolean) {
  return [
    orderBy('date', isPrev ? 'asc' : 'desc'), //
    orderBy('id', 'asc'),
    where('date', isPrev ? '>' : '<', date),
    where('id', '!=', postId),
    limit(1),
  ];
}
export async function addOrUpdatePost(post: FullPostData) {
  try {
    const userRef = doc(firebaseDB, 'users', post.writer);
    await setDoc(doc(firebaseDB, 'posts', post.id), { ...post, writer: userRef });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update post');
  }
}

export async function removePost(postId: string) {
  try {
    await deleteDoc(doc(firebaseDB, 'posts', postId));
  } catch (error) {
    console.log(error);
    throw new Error('Failed to remove post');
  }
}

export async function getLikesCount(path: string) {
  try {
    const postQuery = query(collection(firebaseDB, 'posts'), where('path', '==', path));
    const postRef = (await getDocs(postQuery)).docs[0].ref;
    const likesRef = collection(postRef, 'likes');
    const likes = (await getDocs(likesRef)).docs.map((doc) => doc.id);
    return { likes };
  } catch (error) {
    console.log(error);
  }
  return { likes: [] };
}

export async function plusLikeCount(postId: string, userId: string) {
  try {
    await setDoc(doc(firebaseDB, 'posts', postId, 'likes', userId), { userId });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add like');
  }
}

export async function minusLikeCount(postId: string, userId: string) {
  try {
    await deleteDoc(doc(firebaseDB, 'posts', postId, 'likes', userId));
  } catch (error) {
    console.log(error);
    throw new Error('Failed to remove like');
  }
}

export async function getPostComments(path: string): Promise<[] | CommentData[]> {
  try {
    const postQuery = query(collection(firebaseDB, 'posts'), where('path', '==', path));
    const postRef = (await getDocs(postQuery)).docs[0].ref;
    const commentsQuery = query(collection(postRef, 'comments'), orderBy('createdAt', 'asc'));
    const datas = await getDocs(commentsQuery);

    return await Promise.all(
      datas.docs.map(async (doc) => {
        const data = doc.data();
        const userRef = data.user;
        if (userRef) {
          const user = (await getDoc(userRef)).data() as SimpleUser;
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

export async function addOrUpdatePostComment(postId: string, userId: string, comment: SimpleCommentData) {
  try {
    const userRef = doc(firebaseDB, 'users', userId);
    await setDoc(doc(firebaseDB, 'posts', postId, 'comments', comment.id), {
      ...comment,
      user: userRef,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function removePostComment(postId: string, commentId: string) {
  await deleteDoc(doc(firebaseDB, 'posts', postId, 'comments', commentId));
}
