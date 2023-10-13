"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import FormattedDate from '@/app/components/FormattedDate'

import NextImage from "next/image";
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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Image } from "@nextui-org/image";
import { Divider} from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/react";


import { IconTrash } from "@tabler/icons-react";

async function deleteRoutine(routineId) {
  try {
    const response = await fetch(`/api/routines/${routineId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Client failed to delete routine');
    }

  } catch (error) {
    console.error('Client error deleting routine:', error);
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
    <>
    {routines.length > 0 ? 
      routines.map((routine) => (
        <Card key={routine.id}>
          <CardHeader className="flex gap-3">
            <Image
              as={NextImage}
              alt="Workout Icon"
              height={40}
              radius="sm"
              src="/icons/tabler-icon-barbell-white.svg"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{routine.name}</p>
              <p className="text-small text-default-500">Last updated: <FormattedDate dateString={routine.updatedAt} /></p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="px-3">
            {routine.notes && (
              <Accordion isCompact>
                <AccordionItem key="1" aria-label="Notes" title="Notes">
                  <p className="text-sm mb-3 text-gray-500">{routine.notes}</p>
                </AccordionItem>
              </Accordion>
            )}
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
          <Divider />
          <CardFooter>
            <Button size="sm" color="danger" onPress={() => handleDeletePress(routine.id)} className="gap-unit-1">
              <IconTrash size={16} />Delete</Button>
          </CardFooter>
        </Card>
      ))
      : 
        <p>No routines saved.</p>
      }
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
        </>
  );
}

export default RoutineList;
