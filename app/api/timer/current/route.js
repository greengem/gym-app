import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      console.error("Authentication Error: Session or User ID not found.");
      return Response.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;

    const timer = await prisma.timer.findFirst({
      where: {
        session: {
          userId: userId
        },
        OR: [
          { status: 'RUNNING' },
          { status: 'PAUSED' }
        ]
      },
      include: {
        session: true
      }
    });


    if (!timer) {
      return Response.json({
        success: true,
        status: 'NOT_STARTED',
        message: "No active or paused timer found"
      }, { status: 200 });
    }
    

    return Response.json({ success: true, timer });

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
