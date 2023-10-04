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
import { Button } from "@nextui-org/button";
import {  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";

async function deleteRoutine(routineId) {
  try {
    const response = await fetch(`/api/routines/${routineId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete routine');
    }

  } catch (error) {
    console.error('Error deleting routine:', error);
  }
}


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
          <CardFooter className="px-5 justify-between">
            <Button color="secondary">Edit</Button>
            <Button color="danger" onClick={() => deleteRoutine(routine.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}


export default RoutineList;
