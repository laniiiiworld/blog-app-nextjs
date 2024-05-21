import { Order } from '@/hooks/usePosts';
import { getAllPosts } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const order: Order | null = searchParams.get('order') as Order;
  const tag: string | null = searchParams.get('tag');

  if (!order && !tag) {
    return new Response('Bad Request', { status: 400 });
  }

  return getAllPosts({ order, tag }) //
    .then((data) => NextResponse.json(data));
}
