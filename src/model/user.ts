export type User = {
  uid: string;
  photoURL: string;
  email: string;
  displayName: string;
};

export type SimpleUser = Omit<User, 'email'>;
