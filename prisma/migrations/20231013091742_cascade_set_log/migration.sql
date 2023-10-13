-- DropForeignKey
ALTER TABLE "SetLog" DROP CONSTRAINT "SetLog_workoutLogExerciseId_fkey";

-- AddForeignKey
ALTER TABLE "SetLog" ADD CONSTRAINT "SetLog_workoutLogExerciseId_fkey" FOREIGN KEY ("workoutLogExerciseId") REFERENCES "WorkoutLogExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
