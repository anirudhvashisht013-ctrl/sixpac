'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Measurement = { date: string; weight?: number; waist?: number };

type Photo = { id: number; date: string; frontUrl?: string; sideUrl?: string; backUrl?: string };

export default function TransformationPage() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');

  async function load() {
    const [mRes, pRes] = await Promise.all([fetch('/api/measurements'), fetch('/api/photos')]);
    setMeasurements(await mRes.json());
    setPhotos(await pRes.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function saveMeasurement() {
    await fetch('/api/measurements', { method: 'POST', body: JSON.stringify({ date, weight: Number(weight), waist: Number(waist) }) });
    load();
  }

  async function savePhoto() {
    await fetch('/api/photos', { method: 'POST', body: JSON.stringify({ date, frontUrl: '/uploads/front-placeholder.png', sideUrl: '/uploads/side-placeholder.png', backUrl: '/uploads/back-placeholder.png' }) });
    load();
  }

  const delta = measurements.length > 1 ? { start: measurements[0], end: measurements[measurements.length - 1] } : null;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Transformation</h1>
      <Card><CardHeader><CardTitle>Add measurement</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-2"><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><Input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} /><Input type="number" placeholder="Waist" value={waist} onChange={(e) => setWaist(e.target.value)} /><Button className="col-span-2" onClick={saveMeasurement}>Save</Button></CardContent></Card>
      <Card><CardHeader><CardTitle>Progress charts</CardTitle></CardHeader><CardContent><div className="h-48"><ResponsiveContainer width="100%" height="100%"><LineChart data={measurements}><XAxis dataKey="date" hide /><YAxis /><Tooltip /><Line dataKey="weight" stroke="#2563eb" /><Line dataKey="waist" stroke="#16a34a" /></LineChart></ResponsiveContainer></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Photos</CardTitle></CardHeader><CardContent className="space-y-2"><Button onClick={savePhoto}>Add placeholder photo set</Button>{photos.map((p) => <div key={p.id} className="rounded border p-2 text-sm">{p.date.slice(0,10)} • front/side/back saved</div>)}</CardContent></Card>
      {delta ? <Card><CardHeader><CardTitle>Monthly Delta Summary</CardTitle></CardHeader><CardContent className="text-sm">Weight: {(delta.end.weight ?? 0) - (delta.start.weight ?? 0)} kg • Waist: {(delta.end.waist ?? 0) - (delta.start.waist ?? 0)} cm</CardContent></Card> : null}
    </div>
  );
}
