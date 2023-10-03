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
      },
      take: 200,
    });
  }

export default async function ExercisesPage() {
    const session = await getServerSession();
    const exercises = await fetchExercises();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <PageHeading title="Exercises" />
            <ExerciseList exercises={exercises} />
        </>
    );
}
