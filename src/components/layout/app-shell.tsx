'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/', label: 'Dashboard' },
  { href: '/planner', label: 'Planner' },
  { href: '/workouts', label: 'Workouts' },
  { href: '/transformation', label: 'Transform' },
  { href: '/settings', label: 'Settings' }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith('/onboarding') && pathname !== '/splash';

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <main className="flex-1 p-4 pb-24">{children}</main>
      {showNav ? (
        <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 border-t bg-background">
          <div className="grid grid-cols-5">
            {tabs.map((tab) => (
              <Link key={tab.href} href={tab.href} className={cn('py-3 text-center text-xs', pathname === tab.href ? 'font-semibold text-primary' : 'text-muted-foreground')}>
                {tab.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
