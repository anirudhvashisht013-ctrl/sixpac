import { getDashboardData } from '@/lib/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyLogForm } from '@/components/planner/daily-log-form';

function metricClass(ok: boolean) {
  return ok ? 'text-green-600' : 'text-red-600';
}

export async function DashboardView() {
  const { effectiveTarget, todayLog, compliance, loggingStreak } = await getDashboardData();
  const metrics = [
    ['Steps', todayLog?.steps, effectiveTarget.stepsPerDay, true],
    ['Calories', todayLog?.calories, effectiveTarget.caloriesPerDay, false],
    ['Protein', todayLog?.protein, effectiveTarget.proteinPerDay, true],
    ['Sleep', todayLog?.sleepHours, effectiveTarget.sleepHoursPerDay, true],
    ['Water', todayLog?.waterLiters, effectiveTarget.waterLitersPerDay, true]
  ] as const;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Today Dashboard</h1>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(([name, value, target, highIsGood]) => {
          const ok = value !== undefined && value !== null ? (highIsGood ? Number(value) >= Number(target) : Number(value) <= Number(target)) : false;
          return (
            <Card key={name}>
              <CardHeader><CardTitle className="text-sm">{name}</CardTitle></CardHeader>
              <CardContent>
                <p className={metricClass(ok)}>{value ?? '-'} / {target}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card><CardHeader><CardTitle>Streak</CardTitle></CardHeader><CardContent>{loggingStreak} day logging streak</CardContent></Card>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(compliance).map(([k, v]) => (
          <Card key={k}><CardContent className="pt-4 text-center"><p className="text-xs capitalize">{k}</p><p className="font-semibold">{v}%</p></CardContent></Card>
        ))}
      </div>
      <DailyLogForm />
    </div>
  );
}
