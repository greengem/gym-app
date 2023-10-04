"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

function RoutineList({ routines }) {
  return (
    <div>
      {routines.map((routine) => (
        <Card key={routine.id} className="mb-5">
          <CardHeader className="px-5 pt-5">{routine.name}</CardHeader>
          <CardBody className="py-0">
            <Table removeWrapper aria-label="Routine exercises table">
              <TableHeader>
                <TableColumn>EXERCISE</TableColumn>
                <TableColumn>SETS</TableColumn>
                <TableColumn>REPS</TableColumn>
                <TableColumn>TIME</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No Exercises."}>
                {routine.WorkoutPlanExercise.map((exerciseDetail) => (
                  <TableRow key={exerciseDetail.Exercise.id}>
                    <TableCell>{exerciseDetail.Exercise.name}</TableCell>
                    <TableCell>{exerciseDetail.sets}</TableCell>
                    <TableCell>{exerciseDetail.reps}</TableCell>
                    <TableCell>{exerciseDetail.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
          <CardFooter className="px-5">
            <Button color="secondary">Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}


export default RoutineList;
