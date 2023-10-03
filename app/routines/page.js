import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

import PageHeading from "../components/PageHeading";
import RoutineList from './RoutineList';

//export const revalidate = 0; //Needed to force no caching.

async function fetchRoutines() {
    return await prisma.workoutPlan.findMany({
      where: {
        userId: 'cln4dplo80000gwz1joipss3e',
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
    const routines = await fetchRoutines();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            <PageHeading title="Routines" />
            <RoutineList routines={routines} />
        </>
    );
}
