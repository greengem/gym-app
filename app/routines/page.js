import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

import PageHeading from "../components/PageHeading";
import RoutineList from './RoutineList';

import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";

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
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const routines = await fetchRoutines(session.user.id);

  return (
      <>
          <PageHeading title="Routines" />
          <Link as={NextLink} href="/routines/new" className="mb-5">
            <Button color="primary">Create New Routine</Button>
          </Link>
          <RoutineList routines={routines} />
      </>
  );
}

