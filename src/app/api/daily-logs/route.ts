import { getWeekStart } from '@/lib/date';
import { prisma } from '@/lib/prisma';
import { dailyLogSchema } from '@/lib/schemas';
import { DEFAULT_TARGETS } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const parsed = dailyLogSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const payload = parsed.data;
  const { workoutId, ...logInput } = payload;
  const date = new Date(logInput.date);
  const weekStart = getWeekStart(date);

  const target = await prisma.weeklyTarget.upsert({
    where: { userId_weekStart: { userId: 1, weekStart } },
    update: {},
    create: { userId: 1, weekStart, ...DEFAULT_TARGETS }
  });

  const log = await prisma.dailyLog.upsert({
    where: { date },
    update: { ...logInput, date, weekId: target.id },
    create: { ...logInput, date, userId: 1, weekId: target.id }
  });

  if (workoutId) {
    await prisma.workoutAssignment.upsert({
      where: { dailyLogId: log.id },
      update: { workoutId },
      create: { dailyLogId: log.id, workoutId }
    });
  }

  return NextResponse.json(log);
}
