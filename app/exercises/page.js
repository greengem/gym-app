import PageHeading from "@/app/components/PageHeading";
import ExerciseList from "./ExerciseList";

export default async function ExercisesPage() {
    const exercisesData = await fetch(`${process.env.NEXTAUTH_URL}/api/exercises`, { cache: 'no-store' });
    const exercises = await exercisesData.json();

    return (
        <>
            <PageHeading title="Exercises" />
            <ExerciseList exercises={exercises} />
        </>
    );
}
