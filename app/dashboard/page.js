import PageHeading from "../components/PageHeading";
import WorkoutFreqOverTime from "./KPI/WorkoutFreqOverTime"
import VolumeProgression from "./KPI/VolumeProgression"
import ExerciseBreakdown from "./KPI/ExerciseBreakdown"
import OneRM from "./KPI/OneRM"
import CaloriesBurned from "./KPI/CaloriesBurned"
import WorkoutDurations from "./KPI/WorkoutDurations"

import { Card } from "@nextui-org/card";

export default function DashboardPage() {
    return (
        <>
            <PageHeading title="Dashboard" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-5">
              <Card><WorkoutFreqOverTime /></Card>
              <Card><VolumeProgression /></Card>
              <Card><ExerciseBreakdown /></Card>
              <Card><OneRM /></Card>
              <Card><CaloriesBurned /></Card>
              <Card><WorkoutDurations /></Card>
            </div>
        </>
    );
}
