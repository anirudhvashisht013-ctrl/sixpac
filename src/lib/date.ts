import { startOfWeek } from 'date-fns';

export const getWeekStart = (date: Date) => startOfWeek(date, { weekStartsOn: 1 });
export const normalizeDate = (date: Date) => new Date(date.toISOString().slice(0, 10));
