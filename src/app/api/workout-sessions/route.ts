import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await prisma.workoutSession.create({
    data: {
      userId: 1,
      workoutId: body.workoutId,
      date: new Date(body.date),
      notes: body.notes,
      setLogs: {
        create: (body.setLogs || []).map((set: any) => ({
          exerciseId: set.exerciseId,
          setNumber: set.setNumber,
          weight: set.weight,
          reps: set.reps,
          rpe: set.rpe,
          notes: set.notes
        }))
      }
    }
  });
  return NextResponse.json(session);
}
