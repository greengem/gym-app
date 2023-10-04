import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Import authOptions

export async function POST(request) {
  // Log incoming request:
  console.log('Incoming request:', request.method, request.url, await request.text());

  // Use getServerSession with authOptions
  const session = await getServerSession(authOptions);

  // Log the session for diagnostic purposes
  console.log('Retrieved session:', session);

  if (!session || !session.user || !session.user.id) {
    console.error('Session or user details missing:', session);
    return new Response(JSON.stringify({ success: false, error: "User not authenticated" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawData = await request.text();
  const data = JSON.parse(rawData);

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
    console.error("Error while saving routine:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
