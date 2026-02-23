import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const measurements = await prisma.measurement.findMany({ where: { userId: 1 }, orderBy: { date: 'asc' } });
  return NextResponse.json(measurements);
}

export async function POST(req: Request) {
  const body = await req.json();
  const date = new Date(body.date);
  const data = await prisma.measurement.upsert({
    where: { userId_date: { userId: 1, date } },
    update: body,
    create: { ...body, userId: 1, date }
  });
  return NextResponse.json(data);
}
