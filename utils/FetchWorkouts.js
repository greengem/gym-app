import { cache } from 'react';
import prisma from "@/lib/prisma";

export const revalidate = 600; // Adjust this based on your needs. For this example, I've set it to 10 minutes.

export const fetchWorkouts = cache(async function(userId) {
  return await prisma.workoutLog.findMany({
      where: {
        userId: userId,
      },
      include: {
        exercises: {
          include: {
            Exercise: true,
            sets: true
          }
        }
      }
  });
});
