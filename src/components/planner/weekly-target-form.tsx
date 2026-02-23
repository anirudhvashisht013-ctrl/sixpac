'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { weeklyTargetSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type WeeklyInput = z.infer<typeof weeklyTargetSchema>;

export function WeeklyTargetForm({ weekStart }: { weekStart: string }) {
  const form = useForm<WeeklyInput>({
    resolver: zodResolver(weeklyTargetSchema),
    defaultValues: {
      weekStart,
      stepsPerDay: 10000,
      caloriesPerDay: 2200,
      proteinPerDay: 160,
      sleepHoursPerDay: 7.5,
      waterLitersPerDay: 2.5,
      fiberPerDay: 25,
      trainingDaysPerWeek: 4,
      zone2MinutesPerWeek: 90,
      mobilityMinutesPerWeek: 45
    }
  });

  const submit = form.handleSubmit(async (values) => {
    await fetch('/api/weekly-targets', { method: 'POST', body: JSON.stringify(values) });
    window.location.reload();
  });

  return <Card><CardHeader><CardTitle>Weekly Targets</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-2">{Object.keys(form.getValues()).map((key) => (
    key === 'weekStart' ? <Input key={key} type="date" {...form.register('weekStart')} /> : <Input key={key} type="number" step="0.1" placeholder={key} {...form.register(key as keyof WeeklyInput)} />
  ))}<Button className="col-span-2" onClick={submit}>Save targets</Button></CardContent></Card>;
}
