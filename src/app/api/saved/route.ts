import { getAllSavedPosts } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return getAllSavedPosts() //
    .then((data) => NextResponse.json(data));
}
