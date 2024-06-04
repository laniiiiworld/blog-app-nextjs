import { SimpleUser } from '@/model/user';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firebaseDB } from './firebase';

export async function addUser(user: SimpleUser) {
  try {
    return await setDoc(doc(firebaseDB, 'users', user.uid), user);
  } catch (error) {
    console.log(error);
  }
}

export async function isAdmin(userId: string) {
  try {
    const userRef = doc(firebaseDB, 'users', userId);
    const adminsRef = collection(firebaseDB, 'admins');
    const admin = await getDocs(query(adminsRef, where('user', '==', userRef)));
    return admin.size > 0;
  } catch (error) {
    console.log(error);
  }
  return false;
}
