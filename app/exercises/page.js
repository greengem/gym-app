import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import PageHeading from "@/app/components/PageHeading";
import ExerciseList from "./ExerciseList";

export default async function ExercisesPage() {
    const session = await getServerSession();
    const exercisesData = await fetch(`${process.env.NEXTAUTH_URL}/api/exercises`, { cache: 'no-store' });
    const exercises = await exercisesData.json();

    if (!session || !session.user) {
        redirect("/");
    }

    return (
        <>
            <PageHeading title="Exercises" />
            <ExerciseList exercises={exercises} />
        </>
    );
}
