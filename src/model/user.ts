import { User } from 'firebase/auth';

export type FullUser = Pick<User, 'uid' | 'photoURL' | 'email' | 'displayName'>;
