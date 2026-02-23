import { addDays, eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { DEFAULT_TARGETS } from '@/lib/constants';

export async function getDashboardData() {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const [target, todayLog, weekLogs] = await Promise.all([
    prisma.weeklyTarget.findUnique({ where: { userId_weekStart: { userId: 1, weekStart } } }),
    prisma.dailyLog.findUnique({ where: { date: new Date(today.toISOString().slice(0, 10)) }, include: { workoutAssignment: { include: { workout: true } } } }),
    prisma.dailyLog.findMany({ where: { userId: 1, date: { gte: weekStart, lte: weekEnd } } })
  ]);

  const effectiveTarget = target ?? DEFAULT_TARGETS;
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const compliance = {
    steps: Math.round((weekLogs.filter((l) => (l.steps ?? 0) >= effectiveTarget.stepsPerDay).length / weekDays.length) * 100),
    calories: Math.round((weekLogs.filter((l) => (l.calories ?? 0) <= effectiveTarget.caloriesPerDay).length / weekDays.length) * 100),
    protein: Math.round((weekLogs.filter((l) => (l.protein ?? 0) >= effectiveTarget.proteinPerDay).length / weekDays.length) * 100)
  };

  const recent = await prisma.dailyLog.findMany({ where: { userId: 1 }, orderBy: { date: 'desc' }, take: 30 });
  let loggingStreak = 0;
  for (let i = 0; i < 30; i++) {
    const d = addDays(new Date(today.toISOString().slice(0, 10)), -i);
    const exists = recent.find((r) => format(r.date, 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd'));
    if (!exists) break;
    loggingStreak += 1;
  }

  return { effectiveTarget, todayLog, compliance, loggingStreak };
}
