import { getServerSession } from "next-auth";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const session = await getServerSession(req);
  
  if (!session || !session.user || !session.user.id) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const userId = session.user.id;

  const data = JSON.parse(req.body);
  const { routineName, exercises, notes } = data;

  try {
    const newWorkoutPlan = await prisma.workoutPlan.create({
        data: {
            name: routineName,
            notes: notes,
            userId: userId,
            exercises: {
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

    res.status(200).json({ success: true, id: newWorkoutPlan.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
