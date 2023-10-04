import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({ success: false, error: "User not authenticated" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = JSON.parse(await request.text());
  const { routineName, exercises, notes } = data;
  const userId = session.user.id;

  try {
    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: routineName,
        notes: notes,
        userId: userId,
        WorkoutPlanExercise: { 
          create: exercises.map((exercise, index) => ({
            exerciseId: exercise.id,
            sets: exercise.sets,
            reps: exercise.reps,
            duration: exercise.duration,
            order: index + 1,
          })),
        },
      },
    });
    
    return new Response(JSON.stringify({ success: true, id: newWorkoutPlan.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
