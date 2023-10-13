-- DropForeignKey
ALTER TABLE "WorkoutLogExercise" DROP CONSTRAINT "WorkoutLogExercise_workoutLogId_fkey";

-- AddForeignKey
ALTER TABLE "WorkoutLogExercise" ADD CONSTRAINT "WorkoutLogExercise_workoutLogId_fkey" FOREIGN KEY ("workoutLogId") REFERENCES "WorkoutLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
