import { Post } from '@/service/posts';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function getPosts(): Promise<Post[]> {
  const snapshot = await get(ref(database, 'posts'));
  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    console.log('No data available');
  }
  return [];
}
