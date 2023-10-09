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
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image} from "@nextui-org/react";
import { IconTrash } from "@tabler/icons-react";

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

  const handleConfirmDelete = async () => {
    try {
      await deleteRoutine(selectedRoutineId);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
    setSelectedRoutineId(null);
    onClose();
  };
  

  return (
    <div>
      {routines.map((routine) => (
        <Card key={routine.id} className="mb-5">
          <CardHeader className="flex gap-3 px-5">
            <Image
              className="bg-white"
              alt="Workout Icon"
              height={40}
              radius="sm"
              src="/icons/tabler-icon-barbell.svg"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{routine.name}</p>
              <p className="text-small text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <CardBody className="py-0">
          {routine.notes && <p className="text-xs mb-3 text-gray-500">{routine.notes}</p>}
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
            <Button color="danger" onPress={() => handleDeletePress(routine.id)} className="gap-unit-1">
              <IconTrash size={16} />Delete</Button>
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
