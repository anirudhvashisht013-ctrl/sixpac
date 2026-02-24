import { PrismaClient } from '@prisma/client';
import { addDays, startOfWeek } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  let user = await prisma.userProfile.findFirst();
  if (!user) {
    user = await prisma.userProfile.create({
      data: {
        name: 'Demo User',
        dob: new Date('1995-07-01'),
        onboardingDone: false
      }
    });
  }

  const existingGoal = await prisma.onboardingGoal.findFirst({
  where: { userId: user.id }
  });
  if (!existingGoal) {
    await prisma.onboardingGoal.create({
      data: {
        userId: user.id,
        goalType: 'RECOMP',
        bodyFatRange: '18-22%',
        activityLevel: 'moderate',
        workoutFrequency: 4,
        suggestedSteps: 9000
      }
    });
  }

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const target = await prisma.weeklyTarget.upsert({
    where: { userId_weekStart: { userId: user.id, weekStart } },
    update: {},
    create: {
      userId: user.id,
      weekStart,
      stepsPerDay: 10000,
      caloriesPerDay: 2200,
      proteinPerDay: 160
    }
  });

  for (let i = 0; i < 3; i++) {
    const day = addDays(weekStart, i);
    const existing = await prisma.dailyLog.findFirst({
    where: { userId: user.id, date: day }
    });

    if (!existing) {
      await prisma.dailyLog.create({
        data: {
          userId: user.id,
          weekId: target.id,
          date: day,
          steps: 9000 + i * 1000,
          calories: 2100,
          protein: 150,
          sleepHours: 7 + i * 0.3,
          waterLiters: 2.5,
          fiber: 27,
          trainingDone: i !== 1
        }
      });
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
