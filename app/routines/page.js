import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

import PageHeading from "../components/PageHeading";
import RoutineList from './RoutineList';

//export const revalidate = 0; //Needed to force no caching.

async function fetchRoutines(userId) {
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
}

export default async function RoutinesPage() {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    const routines = await fetchRoutines(session.user.id);

    return (
        <>
            <PageHeading title="Routines" />
            <RoutineList routines={routines} />
        </>
    );
}
