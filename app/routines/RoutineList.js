"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'

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
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

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
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRoutineId, setSelectedRoutineId] = useState(null);


  const handleDeletePress = (routineId) => {
    setSelectedRoutineId(routineId);
    onOpen();
  }

  const handleConfirmDelete = () => {
    deleteRoutine(selectedRoutineId);
    setSelectedRoutineId(null);
    onClose();
    router.refresh()
  }

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
            <Button onPress={() => handleDeletePress(routine.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
              <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody><p>Are you sure you want to delete this routine?</p></ModalBody>
              <ModalFooter>
              <Button variant="light" onPress={onClose}>Cancel</Button>
              <Button color="danger" onClick={handleConfirmDelete}>Delete</Button>
              </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
  );
}


export default RoutineList;
