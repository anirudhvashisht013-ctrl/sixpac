import Link from 'next/link';
import { addDays, format, startOfWeek } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { WeeklyTargetForm } from '@/components/planner/weekly-target-form';
import { DailyLogForm } from '@/components/planner/daily-log-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function PlannerPage({ searchParams }: { searchParams: { date?: string } }) {
  const date = searchParams.date ? new Date(searchParams.date) : new Date();
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const logs = await prisma.dailyLog.findMany({ where: { userId: 1, date: { gte: weekStart, lte: addDays(weekStart, 6) } }, include: { workoutAssignment: { include: { workout: true } } } });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Planner</h1>
      <Card><CardHeader><CardTitle>Month / Week / Day</CardTitle></CardHeader><CardContent className="grid grid-cols-3 gap-2 text-sm">{Array.from({ length: 30 }).map((_, i) => {
        const day = addDays(new Date(date.getFullYear(), date.getMonth(), 1), i);
        return <Link className="rounded border p-2" key={i} href={`/planner?date=${format(day, 'yyyy-MM-dd')}`}>{format(day, 'd')}</Link>;
      })}</CardContent></Card>
      <WeeklyTargetForm weekStart={format(weekStart, 'yyyy-MM-dd')} />
      <DailyLogForm date={format(date, 'yyyy-MM-dd')} />
      <Card><CardHeader><CardTitle>This week logs</CardTitle></CardHeader><CardContent className="space-y-2">{logs.map((log) => <div key={log.id} className="rounded border p-2 text-sm">{format(log.date, 'EEE d')}: {log.steps ?? 0} steps {log.workoutAssignment?.workout ? `• ${log.workoutAssignment.workout.name}` : ''}</div>)}</CardContent></Card>
    </div>
  );
}
