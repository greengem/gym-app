import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient()

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