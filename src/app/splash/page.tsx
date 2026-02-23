import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SplashPage() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-5xl font-bold text-primary">6Pac</p>
      <p className="text-muted-foreground">Plan monthly. Win weekly. Execute daily.</p>
      <Button asChild>
        <Link href="/onboarding">Start setup</Link>
      </Button>
    </div>
  );
}
