'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Exercise = {
  name: string;
  warmupGuidance?: string;
  workingSets: number;
  repRange?: string;
  earlySetRpe?: number;
  lastSetRpe?: number;
  restSeconds?: number;
  notes?: string;
  substitutionOne?: string;
  substitutionTwo?: string;
  youtubeLinks?: string[];
};

type Workout = { id: number; name: string; description?: string; exercises: (Exercise & { id: number })[] };

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [name, setName] = useState('Upper Day');
  const [exerciseName, setExerciseName] = useState('Incline DB Press');

  async function load() {
    const res = await fetch('/api/workouts');
    setWorkouts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function createWorkout() {
    await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify({
        name,
        exercises: [{ name: exerciseName, workingSets: 3, repRange: '6-10', earlySetRpe: 7, lastSetRpe: 9, restSeconds: 120, youtubeLinks: ['https://youtube.com'] }]
      })
    });
    load();
  }

  async function logSet(workoutId: number, exerciseId: number) {
    await fetch('/api/workout-sessions', {
      method: 'POST',
      body: JSON.stringify({
        workoutId,
        date: new Date().toISOString(),
        setLogs: [{ exerciseId, setNumber: 1, weight: 30, reps: 10, rpe: 8 }]
      })
    });
    alert('Session logged');
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Workouts</h1>
      <Card>
        <CardHeader><CardTitle>Create workout</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
          <Button onClick={createWorkout}>Create</Button>
        </CardContent>
      </Card>
      {workouts.map((workout) => (
        <Card key={workout.id}>
          <CardHeader><CardTitle>{workout.name}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {workout.exercises.map((exercise) => (
              <details key={exercise.id} className="rounded border p-2">
                <summary className="cursor-pointer font-medium">{exercise.name}</summary>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Warm-up: {exercise.warmupGuidance ?? '—'}</p>
                  <p>Sets: {exercise.workingSets} • Reps: {exercise.repRange}</p>
                  <p>RPE: {exercise.earlySetRpe} → {exercise.lastSetRpe}</p>
                  <p>Rest: {exercise.restSeconds}s</p>
                  <Button onClick={() => logSet(workout.id, exercise.id)}>Log quick set</Button>
                </div>
              </details>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
