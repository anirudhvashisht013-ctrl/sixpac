import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const workouts = await prisma.workout.findMany({ include: { exercises: { orderBy: { orderIndex: 'asc' } } }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(workouts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const workout = await prisma.workout.create({
    data: {
      userId: 1,
      name: body.name,
      description: body.description,
      exercises: {
        create: (body.exercises || []).map((exercise: any, idx: number) => ({ ...exercise, orderIndex: idx, youtubeLinks: exercise.youtubeLinks?.join(',') }))
      }
    },
    include: { exercises: true }
  });
  return NextResponse.json(workout);
}
