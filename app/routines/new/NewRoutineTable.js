"use client";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import {Input} from "@nextui-org/input";

export default function NewRoutineTable({ selectedExercises, setSelectedExercises }) {
    const updateExerciseValues = (index, key, value) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index][key] = value;
        setSelectedExercises(updatedExercises);
    };
    return (
        <>
            <Table removeWrapper aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>Exercise</TableColumn>
                    <TableColumn>Sets</TableColumn>
                    <TableColumn>Reps</TableColumn>
                    <TableColumn>Time</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {selectedExercises.map((exercise, index) => (
                        <TableRow key={index}>
                            <TableCell>{exercise.name}</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
