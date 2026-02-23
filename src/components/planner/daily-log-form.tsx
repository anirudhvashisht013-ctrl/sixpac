'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dailyLogSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type DailyLogInput = z.infer<typeof dailyLogSchema>;

export function DailyLogForm({ date = new Date().toISOString().slice(0, 10) }: { date?: string }) {
  const form = useForm<DailyLogInput>({ resolver: zodResolver(dailyLogSchema), defaultValues: { date } });

  const onSubmit = form.handleSubmit(async (values) => {
    await fetch('/api/daily-logs', { method: 'POST', body: JSON.stringify(values) });
    window.location.reload();
  });

  return (
    <Card>
      <CardHeader><CardTitle>Quick Daily Log</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Input type="date" className="col-span-2" {...form.register('date')} />
        <Input type="number" placeholder="Steps" {...form.register('steps')} />
        <Input type="number" placeholder="Calories" {...form.register('calories')} />
        <Input type="number" placeholder="Protein" {...form.register('protein')} />
        <Input type="number" step="0.1" placeholder="Sleep" {...form.register('sleepHours')} />
        <Input type="number" step="0.1" placeholder="Water" {...form.register('waterLiters')} />
        <Input type="number" placeholder="Fiber" {...form.register('fiber')} />
        <Button className="col-span-2" onClick={onSubmit}>Save Daily Log</Button>
      </CardContent>
    </Card>
  );
}
