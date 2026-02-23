'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, onboardingGoalSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Step1 = z.infer<typeof profileSchema>;
type Step2 = z.infer<typeof onboardingGoalSchema>;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const form1 = useForm<Step1>({ resolver: zodResolver(profileSchema), defaultValues: { name: '', dob: '', sex: '' } });
  const form2 = useForm<Step2>({ resolver: zodResolver(onboardingGoalSchema), defaultValues: { activityLevel: 'moderate', workoutFrequency: 3, suggestedSteps: 9000 } });

  const saveStep1 = form1.handleSubmit(async (values) => {
    await fetch('/api/profile', { method: 'POST', body: JSON.stringify(values) });
    setStep(2);
  });

  const saveStep2 = form2.handleSubmit(async (values) => {
    await fetch('/api/onboarding-goal', { method: 'POST', body: JSON.stringify(values) });
    router.push('/');
    router.refresh();
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Onboarding</h1>
      {step === 1 ? (
        <Card>
          <CardHeader><CardTitle>Step 1: Profile</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Name</Label><Input {...form1.register('name')} /></div>
            <div><Label>Date of birth</Label><Input type="date" {...form1.register('dob')} /></div>
            <div><Label>Sex (optional)</Label><Input placeholder="MALE / FEMALE / OTHER" {...form1.register('sex')} /></div>
            <Button onClick={saveStep1}>Continue</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>Step 2: Goals (optional)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Goal Type</Label><Input placeholder="FAT_LOSS / RECOMP / LEAN_BULK / STRENGTH" {...form2.register('goalType')} /></div>
            <div><Label>Body Fat Range</Label><Input placeholder="e.g. 18-22%" {...form2.register('bodyFatRange')} /></div>
            <div><Label>Target Weight</Label><Input type="number" {...form2.register('targetWeight')} /></div>
            <div><Label>Target Body Fat</Label><Input type="number" {...form2.register('targetBodyFat')} /></div>
            <div><Label>Target Waist</Label><Input type="number" {...form2.register('targetWaist')} /></div>
            <div><Label>Activity Level</Label><Input {...form2.register('activityLevel')} /></div>
            <div><Label>Workout Frequency / week</Label><Input type="number" min={0} max={7} {...form2.register('workoutFrequency')} /></div>
            <div><Label>Suggested steps</Label><Input type="number" {...form2.register('suggestedSteps')} /></div>
            <div className="flex gap-2"><Button onClick={saveStep2}>Finish</Button><Button variant="outline" onClick={() => router.push('/')}>Skip</Button></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
