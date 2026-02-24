-- DropIndex
DROP INDEX "DailyLog_date_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_UserProfile" ("activityLevel", "createdAt", "dob", "id", "name", "onboardingDone", "sex", "stepsTarget", "updatedAt", "workoutFrequency") SELECT "activityLevel", "createdAt", "dob", "id", "name", "onboardingDone", "sex", "stepsTarget", "updatedAt", "workoutFrequency" FROM "UserProfile";
DROP TABLE "UserProfile";
ALTER TABLE "new_UserProfile" RENAME TO "UserProfile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
