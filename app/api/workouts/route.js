import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

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
          }
        })
        
        return Response.json(workouts)
    } catch (error) {
        return Response.json({ error: "An error occurred fetching workouts." }, { status: 500 })
    }
  }
  