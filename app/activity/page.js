import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchWorkouts } from "@/utils/FetchWorkouts";

import PageHeading from "../components/PageHeading";
import WorkoutsList from "./WorkoutsList";

export default async function ActivityPage() {
    const session = await getServerSession(authOptions);
    const workouts = await fetchWorkouts(session.user.id);

    return (
        <>
            <PageHeading title="Activity" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-5">
              <WorkoutsList workouts={workouts} />
            </div>
        </>
    );
}
