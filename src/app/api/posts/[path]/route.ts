import { PostWithAdjacents } from '@/model/post';
import { onlyAdminUserSession } from '@/service/firebaseAdmin';
import { getPostWithAdjacents, addOrUpdatePost } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { path: string };
};

export function GET(_: NextRequest, context: Context): Promise<NextResponse<PostWithAdjacents | null>> {
  return getPostWithAdjacents(context.params.path) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  return onlyAdminUserSession(req, async () => {
    const { post } = await req.json();

    if (!post) {
      return new Response('Bad Request', { status: 400 });
    }

    return addOrUpdatePost(post)
      .then(() => new Response(JSON.stringify({ success: true }), { status: 200 }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
