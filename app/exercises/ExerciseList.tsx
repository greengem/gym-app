'use client'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination, 
  getKeyValue
} from "@nextui-org/react";

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
  beginner,
  intermediate,
  expert
}

enum MechanicType {
  compound,
  isolation
}
interface ExerciseListProps {
  exercises: Exercise[];
}

const statusColorMap = {
  beginner: "success",
  expert: "danger",
  intermediate: "warning",
};

function ExerciseList({ exercises }: ExerciseListProps): JSX.Element {
  return (
    <>
    <Table aria-label="Exercise Table" className="mb-5">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>FORCE</TableColumn>
        <TableColumn>LEVEL</TableColumn>
        <TableColumn>MECHANIC</TableColumn>
        <TableColumn>EQUIPMENT</TableColumn>
        <TableColumn>CATEGORY</TableColumn>
      </TableHeader>
      <TableBody>
        {exercises.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell>{exercise.name}</TableCell>
            <TableCell>{exercise.force}</TableCell>
            <TableCell>{exercise.level}</TableCell>
            <TableCell>{exercise.mechanic}</TableCell>
            <TableCell>{exercise.equipment}</TableCell>
            <TableCell>{exercise.category}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
      <div className="flex w-full justify-center">

    </div>
        </>
  );
}

export default ExerciseList;
