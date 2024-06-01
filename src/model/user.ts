import { User } from 'firebase/auth';

export type SimpleUser = Pick<User, 'uid' | 'photoURL' | 'email' | 'displayName'>;
export type FullUser = SimpleUser & { isAdmin: boolean };
