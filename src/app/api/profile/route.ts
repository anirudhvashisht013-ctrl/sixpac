import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { profileSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  const parsed = profileSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const profile = await prisma.userProfile.upsert({
    where: { id: 1 },
    update: {
      name: data.name,
      dob: new Date(data.dob),
      sex: data.sex ? data.sex : null,
      onboardingDone: true
    },
    create: {
      id: 1,
      name: data.name,
      dob: new Date(data.dob),
      sex: data.sex ? data.sex : null,
      onboardingDone: true
    }
  });

  return NextResponse.json(profile);
}
