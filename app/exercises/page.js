import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

import PageHeading from "../components/PageHeading";
import ExerciseList from './ExerciseList';

async function fetchExercises() {
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
}


export default async function ExercisesPage() {
    const session = await getServerSession();
    const exercises = await fetchExercises();
    if (!session || !session.user) {
        redirect("/");
    }

    return (
        <>
            <PageHeading title="Exercises" />
            <ExerciseList exercises={exercises} />
        </>
    );
}
