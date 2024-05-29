import { CommentData } from '@/model/post';
import { withSessionUser } from '@/service/firebaseAdmin';
import { addOrUpdatePostComment, getPostComments, removePostComment } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { path: string };
};

export function GET(_: NextRequest, context: Context): Promise<NextResponse<[] | CommentData[]>> {
  return getPostComments(context.params.path) //
    .then((data) => NextResponse.json(data));
}

export async function PUT(req: NextRequest) {
  return withSessionUser(req, async (userId) => {
    const { postId, comment } = await req.json();

    if (!postId || comment === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    return addOrUpdatePostComment(postId, userId, comment)
      .then(() => new Response(JSON.stringify({ success: true }), { status: 200 }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

export async function DELETE(req: NextRequest) {
  return withSessionUser(req, async () => {
    const { postId, commentId } = await req.json();

    if (!postId || !commentId) {
      return new Response('Bad Request', { status: 400 });
    }

    return removePostComment(postId, commentId)
      .then(() => new Response(JSON.stringify({ success: true }), { status: 200 }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
