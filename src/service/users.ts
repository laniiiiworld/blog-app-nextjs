import { FullUser } from '@/model/user';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseDB } from './firebase';

export async function addUser(user: FullUser) {
  try {
    return await setDoc(doc(firebaseDB, 'users', user.uid), user);
  } catch (error) {
    console.log(error);
  }
}
