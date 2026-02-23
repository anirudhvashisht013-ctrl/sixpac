import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { DashboardView } from '@/components/dashboard/dashboard-view';

export default async function HomePage() {
  const profile = await prisma.userProfile.findUnique({ where: { id: 1 } });
  if (!profile) redirect('/splash');
  if (!profile.onboardingDone) redirect('/onboarding');

  return <DashboardView />;
}
