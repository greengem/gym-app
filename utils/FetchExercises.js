import { cache } from 'react';
import prisma from "@/lib/prisma";

export const revalidate = 86400; //Revalidate every day since data rarely changes

export const fetchExercises = cache(async () => {
  return await prisma.exercise.findMany({
    select: {
        id: true,
        name: true,
        aliases: true,
        primary_muscles: true,
        secondary_muscles: true,
        force: true,
        level: true,
        mechanic: true,
        equipment: true,
        category: true,
        instructions: true,
        description: true,
        tips: true,
        date_created: true,
        date_updated: true,
      },
    take: 20,
  });
});
