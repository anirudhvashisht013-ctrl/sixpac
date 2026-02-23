import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SettingsPage() {
  const profile = await prisma.userProfile.findUnique({ where: { id: 1 }, include: { onboardingGoal: true } });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings / Profile</h1>
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-1">
          <p>Name: {profile?.name ?? 'Not set'}</p>
          <p>DOB: {profile?.dob.toISOString().slice(0,10) ?? '-'}</p>
          <p>Sex: {profile?.sex ?? '-'}</p>
          <p>Advanced onboarding can be updated by revisiting onboarding screen.</p>
        </CardContent>
      </Card>
    </div>
  );
}
