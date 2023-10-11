"use client";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";

export default function ExerciseFilters() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
            <Select label="Filter by Category">
                <SelectItem>Cardio</SelectItem>
            </Select>
            <Select label="Filter by Muscle Group">
                <SelectItem>Cardio</SelectItem>
            </Select>
        </div>
    )
}