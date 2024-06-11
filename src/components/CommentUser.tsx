import { SimpleUser } from '@/model/user';
import { formatAgo } from '@/util/date';
import Image from 'next/image';

type Props = {
  size: number;
  user: SimpleUser;
  createdAt?: string;
};

export default function CommentUser({ size, user, createdAt }: Props) {
  return (
    <div className={createdAt && 'flex'}>
      <Image //
        src={user.photoURL || ''}
        alt={user.email || ''}
        width={size}
        height={size}
        className='rounded-full'
      />
      {!createdAt && <div className='font-semibold text-center'>{user.displayName}</div>}
      {createdAt && (
        <div className='pl-4'>
          <div className='font-semibold'>{user.displayName}</div>
          {createdAt && <div className='text-light text-sm'>{formatAgo(createdAt)}</div>}
        </div>
      )}
    </div>
  );
}
