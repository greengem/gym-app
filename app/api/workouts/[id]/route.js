import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient()

// DELETE
export async function DELETE(req, context) {
  const params = context.params;

  try {
    await prisma.workoutLog.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Exercise deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting the Exercise." });
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

    const workout = await prisma.workoutLog.findFirst({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!workout) {
      return Response.json({ error: "Exercise not found" }, { status: 404 });
    }

    return Response.json(workout);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "An error occurred fetching the Exercise." }, { status: 500 });
  }
}