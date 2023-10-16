import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


// DELETE

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return new Response(JSON.stringify({ success: false, error: "User not authenticated" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = session.user.id;

  try {
    let currentSession = await prisma.session.findFirst({
      where: {
        userId: userId
      }
    });
  
    if (!currentSession) {
      currentSession = await prisma.session.create({
        data: {
          userId: userId
        }
      });
    }
  
    const existingTimer = await prisma.timer.findFirst({
      where: {
        sessionId: currentSession.id,
        OR: [
          { status: 'RUNNING' },
          { status: 'PAUSED' },
        ]
      }
    });
  
    if (existingTimer) {
      return new Response(JSON.stringify({ success: false, error: "An active or paused timer already exists" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    const newTimer = await prisma.timer.create({
      data: {
        sessionId: currentSession.id,
        status: 'RUNNING',
      }
    });
  
    return new Response(JSON.stringify({ success: true, timer: newTimer }), {
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