'use client'
import React from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import { IconInfoCircle } from '@tabler/icons-react';

function WorkoutsList({ workouts }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedWorkout, setSelectedWorkout] = React.useState(null);

    const handleMoreDetailsClick = (workout) => {
        setSelectedWorkout(workout);
        onOpen();
    };

    return (
        <>
            <h1 className='text-3xl font-semibold mb-4'>Activity</h1>
            {workouts.map((workout) => (
                <Card key={workout.id} className="mb-4">
                    <CardHeader className="px-5">Routine: {workout.name}</CardHeader>
                    <CardBody>
                        <Table removeWrapper aria-label="Workout table">
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
                    <CardFooter className="px-5">
                        <Button className="gap-unit-1" color="secondary" onPress={() => handleMoreDetailsClick(workout)}>
                            <IconInfoCircle size={16} />More Details
                        </Button>
                    </CardFooter>
                </Card>
            ))}

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
                                    <Button color="danger" onPress={onCloseModal}>
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