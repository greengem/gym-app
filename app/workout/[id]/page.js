import prisma from '@/lib/prisma';

import PageHeading from "../../components/PageHeading";
import Workout from "./Workout";

async function fetchWorkout(id) {
    return await prisma.workoutPlan.findUnique({
        where: {
          id: id,
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
          }
    });
}

export default async function StartWorkoutPage({ params }) {
    const workout = await fetchWorkout(params.id);

    return (
        <>
            <PageHeading title={workout.name} />
            <div className="text-sm text-gray-500 mb-2">notes: {workout.notes}</div>
            <Workout workout={workout} />
        </>
    );
}
