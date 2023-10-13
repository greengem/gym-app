import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// POST
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({ success: false, error: "User not authenticated" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = JSON.parse(await request.text());
  
  const { name, date, workoutPlanId, duration, exercises } = data;
  const userId = session.user.id;

  if (!name || !date || !workoutPlanId || !exercises) {
    return new Response(JSON.stringify({ success: false, error: "Name, date, workoutPlanId, and exercises are required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const newWorkoutLog = await prisma.workoutLog.create({
      data: {
        name,
        date,
        workoutPlanId,
        duration,
        userId
      },
    });

    for (let exercise of exercises) {
      const newLogExercise = await prisma.workoutLogExercise.create({
        data: {
          workoutLogId: newWorkoutLog.id,
          exerciseId: exercise.id,
        },
      });

      for (let set of exercise.sets) {
        await prisma.setLog.create({
          data: {
            weight: parseFloat(set.weight),
            reps: parseInt(set.reps, 10),
            order: set.setId,
            WorkoutLogExercise: {
              connect: { id: newLogExercise.id },
            },
          },
        });
      }
    }

    return new Response(JSON.stringify({ success: true, id: newWorkoutLog.id }), {
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




// GET
export async function GET() {
  try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
      }
      
      const workouts = await prisma.workoutLog.findMany({
        where: {
          userId: session.user.id
        },
        include: {
          exercises: {
            include: {
              Exercise: true,
              sets: true
            }
          }
        }
      })
      
      return Response.json(workouts)
  } catch (error) {
      return Response.json({ error: "An error occurred fetching workouts." }, { status: 500 })
  }
}
