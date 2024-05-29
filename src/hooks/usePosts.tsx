'use client';
import { PostCardData } from '@/model/post';
import { useQuery } from '@tanstack/react-query';

export type Order = 'asc' | 'desc' | 'name';
export type OrderItem = { key: Order; name: string };

type Props = {
  order?: Order;
  tag?: string;
};

export function usePosts({ order, tag }: Props) {
  const queryString = new URLSearchParams({
    order: order || '',
    tag: tag || '',
  }).toString();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery<PostCardData[], Error>({
    queryKey: ['posts', order, tag],
    queryFn: () =>
      fetch(`/api/posts?${queryString}`, {
        method: 'GET',
      }).then((res) => res.json()),
  });

  return { posts, isLoading, isError };
}
