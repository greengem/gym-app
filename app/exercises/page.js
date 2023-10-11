import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { fetchExercises } from "@/utils/FetchExercises.js";
import PageHeading from "@/app/components/PageHeading";
import ExerciseList from "./ExerciseList";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilters from "./ExerciseFilters"

export default async function ExercisesPage() {
    const session = await getServerSession();
    const exercises = await fetchExercises();
    if (!session || !session.user) {
        redirect("/");
    }

    return (
        <>
            <PageHeading title="Exercises" />
            <ExerciseSearch />
            <ExerciseFilters />
            <ExerciseList exercises={exercises} />
        </>
    );
}
