import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { weeklyTargetSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  const parsed = weeklyTargetSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { weekStart, ...rest } = parsed.data;
  const target = await prisma.weeklyTarget.upsert({
    where: { userId_weekStart: { userId: 1, weekStart: new Date(weekStart) } },
    update: rest,
    create: { userId: 1, weekStart: new Date(weekStart), ...rest }
  });

  return NextResponse.json(target);
}
