import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

import PageHeading from "../components/PageHeading";
import WorkoutFreqOverTime from "./KPI/WorkoutFreqOverTime"
import VolumeProgression from "./KPI/VolumeProgression"
import ExerciseBreakdown from "./KPI/ExerciseBreakdown"
import OneRM from "./KPI/OneRM"
import CaloriesBurned from "./KPI/CaloriesBurned"
import WorkoutDurations from "./KPI/WorkoutDurations"


import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

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



export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    const workouts = await fetchWorkouts(session.user.id);

    return (
        <>
            <PageHeading title="Dashboard" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-5">
              <Card><WorkoutFreqOverTime /></Card>
              <Card><VolumeProgression /></Card>
              <Card><ExerciseBreakdown /></Card>
              <Card><OneRM /></Card>
              <Card><CaloriesBurned /></Card>
              <Card><WorkoutDurations /></Card>
            </div>
        </>
    );
}
