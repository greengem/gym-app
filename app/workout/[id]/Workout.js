"use client";
import { useState } from "react";
import {
  Table, TableHeader, TableBody, TableColumn, TableRow, TableCell,
  Card, CardHeader, CardBody, CardFooter,
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image, Divider, Input, Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { IconPlus, IconDeviceFloppy, IconTrash } from '@tabler/icons-react';

function ExerciseSet({ exerciseItem, workoutData, handleValueChange, handleAddSet, handleDeleteLastSet }) {
  return (
    <Card className="mb-5" key={exerciseItem.Exercise.id}>
      <CardHeader>{exerciseItem.Exercise.name}</CardHeader>
      <Divider />
      <CardBody>
        <Table removeWrapper aria-label="Workout Table">
          <TableHeader>
            <TableColumn>SET</TableColumn>
            <TableColumn>KG</TableColumn>
            <TableColumn>REPS</TableColumn>
          </TableHeader>
          <TableBody>
            {workoutData.find(e => e.id === exerciseItem.Exercise.id).sets.map((set, setIndex) => (
              <TableRow key={setIndex}>
                <TableCell>{setIndex + 1}</TableCell>
                <TableCell>
                  <Input onChange={(e) => handleValueChange('weight', exerciseItem.Exercise.id, setIndex, e.target.value)} />
                </TableCell>
                <TableCell>
                  <Input onChange={(e) => handleValueChange('reps', exerciseItem.Exercise.id, setIndex, e.target.value)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button size="sm" color="secondary" onClick={() => handleAddSet(exerciseItem.Exercise.id)} className="gap-unit-1 mr-2">
          <IconPlus size={16} />Add Set
        </Button>
        <Button size="sm" color="danger" onClick={() => handleDeleteLastSet(exerciseItem.Exercise.id)} className="gap-unit-1">
          <IconTrash size={16} />Delete Last Set
        </Button>
      </CardFooter>
    </Card>
  );
}

function Workout({ workout }) {
  const [workoutData, setWorkoutData] = useState(workout.WorkoutPlanExercise.map(e => ({
    id: e.Exercise.id,
    sets: Array.from({ length: e.sets }).map((_, idx) => ({ setId: idx, weight: null, reps: null }))
  })));

  const handleValueChange = (type, exerciseId, setId, value) => {
    setWorkoutData(prevData => {
      const newData = [...prevData];
      const exerciseIndex = newData.findIndex(e => e.id === exerciseId);
      
      const setObj = { setId, weight: null, reps: null };
      setObj[type] = value;

      if (exerciseIndex === -1) {
        newData.push({
          id: exerciseId,
          sets: [setObj]
        });
      } else {
        const setIndex = newData[exerciseIndex].sets.findIndex(s => s.setId === setId);
        if (setIndex === -1) {
          newData[exerciseIndex].sets.push(setObj);
        } else {
          newData[exerciseIndex].sets[setIndex][type] = value;
        }
      }
      return newData;
    });
  };

  const handleAddSet = (exerciseId) => {
    setWorkoutData(prevData => {
      const exercise = prevData.find(e => e.id === exerciseId);
      exercise.sets.push({ setId: exercise.sets.length, weight: null, reps: null });
      return [...prevData];
    });
  };

  const handleDeleteLastSet = (exerciseId) => {
    setWorkoutData(prevData => {
      const exercise = prevData.find(e => e.id === exerciseId);
      if (exercise.sets.length > 1) {
        exercise.sets.pop();
      }
      return [...prevData];
    });
  };

  const completeWorkout = async () => {
    try {
      const response = await fetch('/api/workouts/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: workout.name,
          date: new Date().toISOString(),
          workoutPlanId: workout.id,
          duration: 60,
          exercises: workoutData
        })
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Workout saved successfully!', responseData);
      } else {
        console.error('Failed to save workout:', responseData.error);
      }
    } catch (error) {
      console.error('An error occurred while saving the workout:', error);
    }
  };

  return (
    <div className="pb-5">
      {workout.WorkoutPlanExercise.map((exerciseItem, index) => (
        <ExerciseSet 
          exerciseItem={exerciseItem}
          workoutData={workoutData}
          handleValueChange={handleValueChange}
          handleAddSet={handleAddSet}
          handleDeleteLastSet={handleDeleteLastSet}
        />
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
