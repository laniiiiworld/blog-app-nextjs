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
        const comments = await getDocs(commentsRef);
        return { ...post, repliesCount: comments.size };
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
      ? [orderBy('date', 'desc')]
      : [where('tags', 'array-contains', tag), orderBy('date', 'desc')];
  }
  return order === 'name' //
    ? [orderBy('title', 'asc'), orderBy('date', 'desc')]
    : [orderBy('date', order)];
}

export async function getAllPostsSize() {
  try {
    const postsRef = collection(firebaseDB, 'posts');
    const datas = await getDocs(query(postsRef));
    return datas.size;
  } catch (error) {
    console.log(error);
  }
  return 0;
}
