import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const photos = await prisma.progressPhoto.findMany({ where: { userId: 1 }, orderBy: { date: 'desc' } });
  return NextResponse.json(photos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const date = new Date(body.date);
  const photo = await prisma.progressPhoto.upsert({
    where: { userId_date: { userId: 1, date } },
    update: body,
    create: { ...body, userId: 1, date }
  });
  return NextResponse.json(photo);
}
