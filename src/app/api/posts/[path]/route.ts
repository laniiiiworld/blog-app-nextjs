import { PostWithAdjacents } from '@/model/post';
import { getPostWithAdjacents } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { path: string };
};

export function GET(_: NextRequest, context: Context): Promise<NextResponse<PostWithAdjacents | null>> {
  return getPostWithAdjacents(context.params.path) //
    .then((data) => NextResponse.json(data));
}
