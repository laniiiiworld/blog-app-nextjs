import { getAllTags } from '@/service/tags';
import { mapToJSON } from '@/util/convert';
import { NextResponse } from 'next/server';

export async function GET() {
  return await getAllTags() //
    .then((tags) => NextResponse.json(mapToJSON(tags)));
}
