import { FullPostData } from '@/model/post';
import { getPost } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { path: string };
};

export function GET(_: NextRequest, context: Context): Promise<NextResponse<FullPostData | null>> {
  return getPost(context.params.path) //
    .then((data) => NextResponse.json(data));
}
