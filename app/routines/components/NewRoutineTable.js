"use client";
import { Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell } from "@nextui-org/table";
import {Input} from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { IconTrash } from "@tabler/icons-react";

export default function NewRoutineTable({ selectedExercises, setSelectedExercises }) {
    const updateExerciseValues = (index, key, value) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index][key] = value;
        setSelectedExercises(updatedExercises);
    };

    const deleteExercise = (indexToDelete) => {
        const updatedExercises = selectedExercises.filter((_, index) => index !== indexToDelete);
        setSelectedExercises(updatedExercises);
    };

    return (
        <>
            <Table removeWrapper aria-label="Table of Exercises for new Routine.">
                <TableHeader>
                    <TableColumn>EXERCISE</TableColumn>
                    <TableColumn>SETS</TableColumn>
                    <TableColumn>REPS</TableColumn>
                    <TableColumn>TIME</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Exercises selected. Click Add Exercises to get started."}>
                    {selectedExercises.map((exercise, index) => (
                        <TableRow key={index}>
                            <TableCell>{exercise.Exercise ? exercise.Exercise.name : exercise.name}</TableCell>
                            <TableCell>
                                <Input 
                                    type="number" 
                                    placeholder="Sets"
                                    value={exercise.sets}
                                    onChange={e => updateExerciseValues(index, 'sets', parseInt(e.target.value))}
                                />
                            </TableCell>
                            <TableCell>
                                <Input 
                                    type="number" 
                                    placeholder="Reps"
                                    value={exercise.reps}
                                    onChange={e => updateExerciseValues(index, 'reps', parseInt(e.target.value))}
                                />
                            </TableCell>
                            <TableCell>
                                <Input 
                                    type="number" 
                                    placeholder="Time"
                                    value={exercise.duration}
                                    onChange={e => updateExerciseValues(index, 'duration', parseInt(e.target.value))}
                                />
                            </TableCell>
                            <TableCell>
                                <Button 
                                    size="sm" 
                                    color="danger" 
                                    isIconOnly
                                    onClick={() => deleteExercise(index)}
                                    ><IconTrash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
