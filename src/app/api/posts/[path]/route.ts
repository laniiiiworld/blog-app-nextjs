import { FullPostData, PostWithAdjacents } from '@/model/post';
import { onlyAdminUserSession } from '@/service/firebaseAdmin';
import { getPostWithAdjacents, addOrUpdatePost, removePost } from '@/service/post';
import { addPostImage, removeAllImages } from '@/service/postImage';
import { removeTags, updateTags } from '@/service/tags';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { path: string };
};

export function GET(_: NextRequest, context: Context): Promise<NextResponse<PostWithAdjacents | null>> {
  return getPostWithAdjacents(context.params.path) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  return onlyAdminUserSession(req, () => handlePostRequest(req));
}

export async function PUT(req: NextRequest) {
  return onlyAdminUserSession(req, () => handlePostRequest(req));
}

export function DELETE(req: NextRequest) {
  return onlyAdminUserSession(req, async () => {
    const { postId } = await req.json();

    if (!postId) {
      return new Response('Bad Request', { status: 400 });
    }

    try {
      await removeTags(postId);
      await Promise.all([removePost(postId), removeAllImages(postId)]);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  });
}

async function handlePostRequest(req: NextRequest) {
  const formData = await req.formData();
  const post = JSON.parse((formData.get('post') as string | null) || '') as FullPostData | null;
  const thumbnail = formData.get('thumbnail') as File | null;
  if (!post) {
    return new Response('Bad Request', { status: 400 });
  }

  try {
    const hasUnmodifiedPrevThumbnail = post.thumbnail && !thumbnail;
    await updateTags(post.id, post.tags);
    await addOrUpdatePost({ ...post, thumbnail: thumbnail?.name || post.thumbnail });
    !hasUnmodifiedPrevThumbnail && (await addPostImage('thumbnail', post.id, thumbnail as File));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
