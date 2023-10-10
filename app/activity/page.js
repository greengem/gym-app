import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

import PageHeading from "../components/PageHeading";
import WorkoutsList from "./WorkoutsList";

async function fetchWorkouts(userId) {
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
}

export default async function ActivityPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    const workouts = await fetchWorkouts(session.user.id);

    return (
        <>
            <PageHeading title="Activity" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <WorkoutsList workouts={workouts} />
            </div>
        </>
    );
}
