import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2),
  dob: z.string(),
  sex: z.enum(['MALE', 'FEMALE', 'OTHER']).optional().or(z.literal(''))
});

export const onboardingGoalSchema = z.object({
  goalType: z.enum(['FAT_LOSS', 'RECOMP', 'LEAN_BULK', 'STRENGTH']).optional(),
  bodyFatRange: z.string().optional(),
  targetWeight: z.coerce.number().optional(),
  targetBodyFat: z.coerce.number().optional(),
  targetWaist: z.coerce.number().optional(),
  activityLevel: z.string().optional(),
  workoutFrequency: z.coerce.number().min(0).max(7).optional(),
  suggestedSteps: z.coerce.number().optional()
});

export const weeklyTargetSchema = z.object({
  weekStart: z.string(),
  stepsPerDay: z.coerce.number(),
  caloriesPerDay: z.coerce.number(),
  proteinPerDay: z.coerce.number(),
  sleepHoursPerDay: z.coerce.number(),
  waterLitersPerDay: z.coerce.number(),
  fiberPerDay: z.coerce.number(),
  trainingDaysPerWeek: z.coerce.number(),
  zone2MinutesPerWeek: z.coerce.number(),
  mobilityMinutesPerWeek: z.coerce.number()
});

export const dailyLogSchema = z.object({
  date: z.string(),
  steps: z.coerce.number().optional(),
  calories: z.coerce.number().optional(),
  protein: z.coerce.number().optional(),
  sleepHours: z.coerce.number().optional(),
  waterLiters: z.coerce.number().optional(),
  fiber: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  trainingDone: z.coerce.boolean().optional(),
  zone2Minutes: z.coerce.number().optional(),
  mobilityMinutes: z.coerce.number().optional(),
  notes: z.string().optional(),
  workoutId: z.coerce.number().optional()
});
