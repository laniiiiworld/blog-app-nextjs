import { withSessionUser } from '@/service/firebaseAdmin';
import { getLikesCount, minusLikeCount, plusLikeCount } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { path: string };
};

export function GET(_: NextRequest, context: Context): Promise<NextResponse<{ likes: string[] }>> {
  return getLikesCount(context.params.path) //
    .then((data) => NextResponse.json(data));
}

export async function PUT(req: NextRequest) {
  return withSessionUser(req, async (userId) => {
    const { postId, like } = await req.json();

    if (!postId || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? plusLikeCount : minusLikeCount;
    return request(postId, userId)
      .then(() => new Response(JSON.stringify({ success: true }), { status: 200 }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
