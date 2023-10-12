'use client'
import { useState } from "react";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilters from "./ExerciseFilters"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Pagination, User } from "@nextui-org/react"
interface Exercise {
  id: string;
  name: string;
  aliases: string[];
  primary_muscles: Muscle[];
  secondary_muscles: Muscle[];
  force?: ForceType;
  level: LevelType;
  mechanic?: MechanicType;
  equipment?: EquipmentType;
  category: CategoryType;
  instructions: string[];
  description?: string;
  imagePath?: string;
  tips: string[];
  date_created: Date;
  date_updated?: Date;
}

enum Muscle {
  abdominals,
  hamstrings,
  adductors,
  quadriceps,
  biceps,
  shoulders,
  chest,
  middle_back,
  calves,
  glutes,
  lower_back,
  lats,
  triceps,
  traps,
  forearms,
  neck,
  abductors
}

enum CategoryType {
  strength,
  stretching,
  plyometrics,
  strongman,
  powerlifting,
  cardio,
  olympic_weightlifting
}

enum EquipmentType {
  body_only,
  machine,
  other,
  foam_roll,
  kettlebells,
  dumbbell,
  cable,
  barbell,
  bands,
  medicine_ball,
  exercise_ball,
  e_z_curl_bar
}

enum ForceType {
  pull,
  push,
  static
}

enum LevelType {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert"
}

enum MechanicType {
  compound,
  isolation
}
interface ExerciseListProps {
  exercises: Exercise[];
}

const levelColorMap: { [key in LevelType]: "success" | "warning" | "danger" } = {
  beginner: "success",
  intermediate: "warning",
  expert: "danger",
};

function ExerciseList({ exercises }: ExerciseListProps): JSX.Element {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [filters, setFilters] = useState({ category: null, muscleGroup: null });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises.filter((exercise) => {
    if (filters.category && exercise.category !== filters.category) return false;
    if (
      filters.muscleGroup &&
      !exercise.primary_muscles.includes(filters.muscleGroup) &&
      !exercise.secondary_muscles.includes(filters.muscleGroup)
    )
      return false;

    if (
      searchQuery &&
      !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  const displayedExercises = filteredExercises.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <ExerciseSearch setSearchQuery={setSearchQuery} />
        <ExerciseFilters onFilterChange={setFilters} />
      </div>
      <Table aria-label="Exercise Table" className="mb-5">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PRIMARY MUSCLES</TableColumn>
          <TableColumn>LEVEL</TableColumn>
          
        </TableHeader>
        <TableBody>
          {displayedExercises.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell className="capitalize">
                <User
                  avatarProps={{radius: "lg", src: exercise.imagePath}}
                  description={exercise.category}
                  name={exercise.name}
                />
                </TableCell>
              <TableCell className="capitalize">
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{exercise.primary_muscles.join(', ')}</p>
                <p className="text-bold text-tiny capitalize text-default-400">{exercise.secondary_muscles.join(', ')}</p>
              </div>
              </TableCell>
              <TableCell>
                <Chip className="capitalize" color={levelColorMap[exercise.level]} size="sm" variant="flat">
                  {exercise.level}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(filteredExercises.length / rowsPerPage)}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}

export default ExerciseList;