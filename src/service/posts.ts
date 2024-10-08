import { FullPostData } from './../model/post';
import { PostCardData } from '@/model/post';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Order } from '@/hooks/usePosts';
import { firebaseDB } from './firebase';
import { SELECT_ALL } from './tags';

type AllPostsProps = { order?: Order; tag: string | null };

export async function getAllPosts({ order, tag }: AllPostsProps): Promise<PostCardData[] | []> {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const datas = await getDocs(query(postsRef, ...makeAllPostsQuery({ order, tag })));
    return Promise.all(
      datas.docs.map(async (doc) => {
        const post = doc.data() as PostCardData;
        const commentsRef = collection(doc.ref, 'comments');
        const likesRef = collection(doc.ref, 'likes');
        const [commentsSnap, likesSnap] = await Promise.all([getDocs(commentsRef), getDocs(likesRef)]);
        return {
          ...post,
          likesCount: likesSnap.size,
          repliesCount: commentsSnap.size,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
  return [];
}

function makeAllPostsQuery({ order, tag }: AllPostsProps) {
  if (tag) {
    return tag === SELECT_ALL //
      ? [where('postType', '==', 'posts'), orderBy('createdAt', 'desc')]
      : [where('postType', '==', 'posts'), where('tags', 'array-contains', tag), orderBy('createdAt', 'desc')];
  }
  return order === 'name' //
    ? [where('postType', '==', 'posts'), orderBy('title', 'asc'), orderBy('createdAt', 'desc')]
    : [where('postType', '==', 'posts'), orderBy('createdAt', order)];
}

export async function getAllPostsSize() {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const datas = await getDocs(query(postsRef, where('postType', '==', 'posts')));
    return datas.size;
  } catch (error) {
    console.log(error);
  }
  return 0;
}

export async function getAllSavedPosts(): Promise<FullPostData[]> {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const datas = await getDocs(query(postsRef, orderBy('createdAt', 'desc'), where('postType', '==', 'saved')));
    return Promise.all(datas.docs.map(async (doc) => doc.data() as FullPostData));
  } catch (error) {
    console.log(error);
  }
  return [];
}
