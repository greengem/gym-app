"use client";
import { useState } from "react";

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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image, Divider } from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {Link} from "@nextui-org/react";
import NextLink from "next/link";

import { IconPlus, IconCheck, IconDeviceFloppy } from '@tabler/icons-react';

function Workout({ workout }) {
    const [additionalSets, setAdditionalSets] = useState({});
    const [workoutData, setWorkoutData] = useState([]);

    const handleWeightChange = (exerciseId, setId, value) => {
        const newData = [...workoutData];
        const exerciseIndex = newData.findIndex(e => e.id === exerciseId);
        
        if (exerciseIndex === -1) {
            newData.push({
                id: exerciseId,
                sets: [{ setId, weight: value, reps: null }]
            });
        } else {
            const setIndex = newData[exerciseIndex].sets.findIndex(s => s.setId === setId);
            if (setIndex === -1) {
                newData[exerciseIndex].sets.push({ setId, weight: value, reps: null });
            } else {
                newData[exerciseIndex].sets[setIndex].weight = value;
            }
        }

        setWorkoutData(newData);
    };

    const handleRepsChange = (exerciseId, setId, value) => {
        const newData = [...workoutData];
        const exerciseIndex = newData.findIndex(e => e.id === exerciseId);
        
        if (exerciseIndex === -1) {
            newData.push({
                id: exerciseId,
                sets: [{ setId, weight: null, reps: value }]
            });
        } else {
            const setIndex = newData[exerciseIndex].sets.findIndex(s => s.setId === setId);
            if (setIndex === -1) {
                newData[exerciseIndex].sets.push({ setId, weight: null, reps: value });
            } else {
                newData[exerciseIndex].sets[setIndex].reps = value;
            }
        }

        setWorkoutData(newData);
    };

    const handleAddSet = (exerciseId) => {
        setAdditionalSets(prev => ({
            ...prev,
            [exerciseId]: (prev[exerciseId] || 0) + 1
        }));
    };

    async function completeWorkout() {
        // Directly use the workoutData state instead of calling gatherWorkoutData
    
        console.log(workoutData);  // Logging to ensure data is correct.
    
        try {
            const response = await fetch('/api/workouts/', {  // Adjust the endpoint as necessary.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: workout.name,
                    date: new Date().toISOString(),  // Current date-time. Adjust if needed.
                    workoutPlanId: workout.id,  // Replace with appropriate value.
                    duration: 60,  // Replace with appropriate value.
                    exercises: workoutData
                })
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                console.log('Workout saved successfully!', responseData);
                // You might want to navigate the user to another page or show a success message.
            } else {
                console.error('Failed to save workout:', responseData.error);
                // Handle errors, e.g. show an error message to the user.
            }
        } catch (error) {
            console.error('An error occurred while saving the workout:', error);
            // Handle errors, e.g. show an error message to the user.
        }
    }
    

    return (
        <div className="pb-5">
            {workout.WorkoutPlanExercise.map((exerciseItem, index) => (
                <Card className="mb-5" key={exerciseItem.Exercise.id}>
                    <CardHeader>{exerciseItem.Exercise.name}</CardHeader>
                    <Divider />
                    <CardBody>
                        <Table removeWrapper aria-label="Workout Table">
                            <TableHeader>
                                <TableColumn>SET</TableColumn>
                                <TableColumn>KG</TableColumn>
                                <TableColumn>REPS</TableColumn>
                                <TableColumn></TableColumn>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: exerciseItem.sets }).map((_, setIndex) => (
                                    <TableRow key={setIndex}>
                                        <TableCell>{setIndex + 1}</TableCell>
                                        <TableCell>
                                            <Input onChange={(e) => handleWeightChange(exerciseItem.Exercise.id, setIndex, e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input onChange={(e) => handleRepsChange(exerciseItem.Exercise.id, setIndex, e.target.value)} />
                                        </TableCell>
                                        <TableCell><Button isIconOnly color="success"><IconCheck size={16} /></Button></TableCell>
                                    </TableRow>
                                ))}
                                {Array.from({ length: additionalSets[exerciseItem.Exercise.id] || 0 }).map((_, setIndex) => (
                                    <TableRow key={exerciseItem.sets + setIndex}>
                                        <TableCell>{exerciseItem.sets + setIndex + 1}</TableCell>
                                        <TableCell>
                                            <Input onChange={(e) => handleWeightChange(exerciseItem.Exercise.id, exerciseItem.sets + setIndex, e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Input onChange={(e) => handleRepsChange(exerciseItem.Exercise.id, exerciseItem.sets + setIndex, e.target.value)} />
                                        </TableCell>
                                        <TableCell><Button isIconOnly color="success"><IconCheck size={16} /></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button color="secondary" onClick={() => handleAddSet(exerciseItem.Exercise.id)} className="gap-unit-1">
                            <IconPlus size={16} />Add Set</Button>
                    </CardFooter>
                </Card>
            ))}
            <Button color="success" onClick={completeWorkout} className="mr-2 gap-unit-1">
                <IconDeviceFloppy size={16} />Complete Workout
            </Button>
            <Link as={NextLink} href="/workout">
                <Button color="danger" variant="ghost">
                    Cancel Workout
                </Button>
            </Link>
        </div>
    );
}

export default Workout;
