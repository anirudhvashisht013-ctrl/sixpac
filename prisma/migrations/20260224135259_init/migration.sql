-- CreateTable
CREATE TABLE "UserProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "name" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "sex" TEXT,
    "onboardingDone" BOOLEAN NOT NULL DEFAULT false,
    "activityLevel" TEXT,
    "workoutFrequency" INTEGER,
    "stepsTarget" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OnboardingGoal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "goalType" TEXT,
    "bodyFatRange" TEXT,
    "targetWeight" REAL,
    "targetBodyFat" REAL,
    "targetWaist" REAL,
    "activityLevel" TEXT,
    "workoutFrequency" INTEGER,
    "suggestedSteps" INTEGER,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OnboardingGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeeklyTarget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "weekStart" DATETIME NOT NULL,
    "stepsPerDay" INTEGER NOT NULL DEFAULT 8000,
    "caloriesPerDay" INTEGER NOT NULL DEFAULT 2200,
    "proteinPerDay" INTEGER NOT NULL DEFAULT 140,
    "sleepHoursPerDay" REAL NOT NULL DEFAULT 7.5,
    "waterLitersPerDay" REAL NOT NULL DEFAULT 2.5,
    "fiberPerDay" INTEGER NOT NULL DEFAULT 25,
    "trainingDaysPerWeek" INTEGER NOT NULL DEFAULT 3,
    "zone2MinutesPerWeek" INTEGER NOT NULL DEFAULT 90,
    "mobilityMinutesPerWeek" INTEGER NOT NULL DEFAULT 60,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeeklyTarget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "weekId" INTEGER,
    "steps" INTEGER,
    "calories" INTEGER,
    "protein" INTEGER,
    "sleepHours" REAL,
    "waterLiters" REAL,
    "fiber" INTEGER,
    "weight" REAL,
    "trainingDone" BOOLEAN NOT NULL DEFAULT false,
    "zone2Minutes" INTEGER,
    "mobilityMinutes" INTEGER,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DailyLog_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "WeeklyTarget" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "warmupGuidance" TEXT,
    "workingSets" INTEGER NOT NULL DEFAULT 3,
    "repRange" TEXT,
    "earlySetRpe" REAL,
    "lastSetRpe" REAL,
    "intensityTechnique" TEXT,
    "restSeconds" INTEGER,
    "notes" TEXT,
    "substitutionOne" TEXT,
    "substitutionTwo" TEXT,
    "youtubeLinks" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkoutAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutId" INTEGER NOT NULL,
    "dailyLogId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WorkoutAssignment_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkoutAssignment_dailyLogId_fkey" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkoutSession_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExerciseSetLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "weight" REAL,
    "reps" INTEGER,
    "rpe" REAL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExerciseSetLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExerciseSetLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "weight" REAL,
    "waist" REAL,
    "chest" REAL,
    "arms" REAL,
    "thighs" REAL,
    "neck" REAL,
    "hips" REAL,
    CONSTRAINT "Measurement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProgressPhoto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "frontUrl" TEXT,
    "sideUrl" TEXT,
    "backUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProgressPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingGoal_userId_key" ON "OnboardingGoal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyTarget_userId_weekStart_key" ON "WeeklyTarget"("userId", "weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_date_key" ON "DailyLog"("date");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutAssignment_dailyLogId_key" ON "WorkoutAssignment"("dailyLogId");

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_userId_date_key" ON "Measurement"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressPhoto_userId_date_key" ON "ProgressPhoto"("userId", "date");
