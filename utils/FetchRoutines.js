import { cache } from 'react';
import prisma from "@/lib/prisma";

export const revalidate = 600; // Adjust as needed. This sets the cache to 10 minutes.

export const fetchRoutines = cache(async function(userId) {
  return await prisma.workoutPlan.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          name: true,
          notes: true,
          WorkoutPlanExercise: {
            select: {
              Exercise: {
                select: {
                  id: true,
                  name: true,
                }
              },
              sets: true,
              reps: true,
              duration: true,
              order: true,
            }
          },
          createdAt: true,
          updatedAt: true,
        }
    });
});
