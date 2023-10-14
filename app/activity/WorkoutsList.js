'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import FormattedDate from '@/app/components/FormattedDate'
import toast from 'react-hot-toast';

import NextLink from "next/link";
import NextImage from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import {  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Divider} from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/react";

import { IconInfoCircle, IconTrash } from '@tabler/icons-react';

async function deleteWorkout(workoutId) {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
      });

    if (response.ok) {
        toast.success('Workout deleted successfully!');
    } else {
        toast.error('Failed to delete workout');
    }
    
      return true;
  
    } catch (error) {
        toast.error('Error deleting workout.');
      return false;
    }
}

function WorkoutsList({ workouts }) {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedWorkout, setSelectedWorkout] = React.useState(null);

    const handleMoreDetailsClick = (workout) => {
        setSelectedWorkout(workout);
        onOpen();
    };

    const handleDelete = async () => {
        const wasDeleted = await deleteWorkout(selectedWorkout.id);
        if (wasDeleted) {
            onClose();
            setSelectedWorkout(null);
            router.refresh();
        } else {
            toast.error('Failed to delete workout. Try again later.');
        }
    };
    

    return (
        <>
            {workouts.length > 0 ? 
            workouts.map((workout) => (
                <Card key={workout.id}>
                    <CardHeader className="flex gap-3 bg-gray-800">
                        <Image
                            as={NextImage}
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="/icons/tabler-icon-barbell-white.svg"
                            width={40}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">Routine: {workout.name}</p>
                            <p className="text-small text-default-500"><FormattedDate dateString={workout.date} /></p>
                        </div>
                    </CardHeader>
                    <CardBody className="px-3">
                        <Table hideHeader removeWrapper aria-label="Workout table">
                            <TableHeader>
                                <TableColumn>Exercise</TableColumn>
                                <TableColumn>Best Set</TableColumn>
                            </TableHeader>
                            <TableBody>
                            {workout.exercises && workout.exercises.map((exerciseLog) => {
                                const bestSet = exerciseLog.sets && exerciseLog.sets.reduce((maxSet, currentSet) => {
                                    return (currentSet.weight > maxSet.weight) ? currentSet : maxSet;
                                }, { weight: 0, reps: 0 });
                                
                                return (
                                    <TableRow key={exerciseLog.id}>
                                        <TableCell>{bestSet.reps} x {exerciseLog.Exercise.name}</TableCell>
                                        <TableCell>{bestSet.weight}kg x {bestSet.reps}</TableCell>
                                    </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button size="sm" className="gap-unit-1 mr-2" color="secondary" onPress={() => handleMoreDetailsClick(workout)}>
                            <IconInfoCircle size={16} />More Details
                        </Button>
                    </CardFooter>
                </Card>
            ))
            : 
                <p><Link as={NextLink} href="/workout">Start a workout</Link> to begin logging data.</p>
            }

            {selectedWorkout && (
                <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onClose} >
                    <ModalContent>
                        {(onCloseModal) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Routine: {selectedWorkout.name}</ModalHeader>
                                <ModalBody>
                                    <ul> 
                                        {selectedWorkout.exercises && selectedWorkout.exercises.map((exerciseLog) => (
                                            <li key={exerciseLog.id} className="mb-10">
                                                <p className="font-semibold text-sm">{exerciseLog.Exercise.name}</p>
                                                <Table removeWrapper hideHeader>
                                                    <TableHeader>
                                                        <TableColumn>Weight</TableColumn>
                                                        <TableColumn>Reps</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                    {exerciseLog.sets && exerciseLog.sets.map((set) => (
                                                        <TableRow key={set.id}>
                                                            <TableCell>{set.weight}kg</TableCell>
                                                            <TableCell>{set.reps} Reps</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    </TableBody>
                                                </Table>
                                            </li>
                                        ))}
                                    </ul>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={handleDelete}>
                                        <IconTrash size={16} />Delete Activity
                                    </Button>
                                    <Button onPress={onCloseModal}>
                                        Close
                                    </Button>
                                    
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}

export default WorkoutsList;