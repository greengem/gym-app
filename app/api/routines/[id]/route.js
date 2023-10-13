import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// DELETE
export async function DELETE(req, context) {
  const params = context.params;

  try {
    await prisma.workoutPlan.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Routine deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting the routine." });
  }
}

// GET
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const routine = await prisma.workoutPlan.findFirst({
      where: {
        id: id,
        userId: session.user.id
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
        updatedAt: true,
      }
    });

    if (!routine) {
      return Response.json({ error: "Routine not found" }, { status: 404 });
    }

    return Response.json(routine);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "An error occurred fetching the routine." }, { status: 500 });
  }
}

// PUT
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { routineName, notes, exercises } = await request.json();

    const updatedRoutine = await prisma.workoutPlan.update({
      where: {
        id: id,
      },
      data: {
        name: routineName,
        notes: notes,
        // I'm only testing updating name notes for now since Exercises will be more complex
      },
    });

    if (!updatedRoutine) {
      return NextResponse.json({ error: "Failed to update the routine." }, { status: 400 });
    }

    return NextResponse.json(updatedRoutine);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred updating the routine." }, { status: 500 });
  }
}
