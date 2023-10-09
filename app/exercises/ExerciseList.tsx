'use client'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

interface Exercise {
  id: string;
  name: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
}

function ExerciseList({ exercises }: ExerciseListProps): JSX.Element {
  return (
    <Table aria-label="Exercise Table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
      </TableHeader>
      <TableBody>
        {exercises.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell>{exercise.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExerciseList;
