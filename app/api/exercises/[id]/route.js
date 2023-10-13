import prisma from '@/lib/prisma';

// GET
export async function GET(request, { params }) {
    try {
        const exerciseId = params.id;

        const exercise = await prisma.exercise.findUnique({
            where: {
                id: exerciseId,
            },
        })

        if (!exercise) {
            return Response.json({ error: "Exercise not found." }, { status: 404 })
        }

        return Response.json(exercise)
    } catch (error) {
        return Response.json({ error: "An error occurred fetching the exercise." }, { status: 500 })
    }
}
