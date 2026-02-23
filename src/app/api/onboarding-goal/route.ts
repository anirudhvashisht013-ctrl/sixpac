import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { onboardingGoalSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  const parsed = onboardingGoalSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const payload = parsed.data;
  const goal = await prisma.onboardingGoal.upsert({
    where: { userId: 1 },
    update: payload,
    create: { userId: 1, ...payload }
  });

  return NextResponse.json(goal);
}
