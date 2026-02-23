# 6Pac App (Single-User MVP)

A mobile-first personal fitness tracker for one local user.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + lightweight shadcn-style components
- Prisma ORM + SQLite (`prisma/dev.db`)
- Recharts
- Zod + React Hook Form

## Features
- Splash + onboarding (required profile step + optional goals step)
- Daily-first dashboard with red/green status and compliance cards
- Planner with month/week/day flow
- Weekly target versioning by week start
- Daily logging with target comparisons
- Workout creation + assignment-ready daily logs + quick set logging
- Transformation tracking (measurements, photo entries, trend chart)
- Minimal gamification (logging streak + perfect-day-ready dashboard logic)

## Setup
```bash
npm install
```

## Database
1. Create and migrate DB:
```bash
npm run prisma:migrate -- --name init
```
2. Generate Prisma client:
```bash
npm run prisma:generate
```
3. Seed sample data:
```bash
npm run prisma:seed
```

## Run
```bash
npm run dev
```
Open `http://localhost:3000`.

## How to use
1. Open splash, go through onboarding.
2. Set weekly targets in Planner.
3. Add daily logs (Dashboard quick form or Planner day view).
4. Create workouts and log sets in Workouts.
5. Track body measurements + photos in Transformation.
6. Review profile in Settings.

## Notes
- This MVP assumes one local profile (`id=1`).
- If weekly targets are missing, sensible defaults are used.
