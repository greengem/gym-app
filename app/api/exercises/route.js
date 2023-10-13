import prisma from '@/lib/prisma';

// GET
export async function GET() {
    try {
        const exercises = await prisma.exercise.findMany()
        return Response.json(exercises)
    } catch (error) {
        return Response.json({ error: "An error occurred fetching exercises." }, { status: 500 })
    }
}
