"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import PageHeading from "../../components/PageHeading";
import ExerciseSet from "./ExerciseSet";
import { transformExerciseData } from './helpers';
import { useTimer } from '@/app/contexts/TimerContext';


import { Button } from "@nextui-org/button";
import { IconPlayerPlay } from "@tabler/icons-react";



const Workout = ({ workout }) => {
  const router = useRouter();
  const [workoutData, setWorkoutData] = useState(transformExerciseData(workout));
  const [duration, setDuration] = useState(0);
  const { timerData, setTimerData } = useTimer();

  useEffect(() => {
    console.log('Timer component re-rendered with:', timerData);
  }, [timerData]);

  const startWorkoutTimer = async () => {
    try {
      const response = await fetch("/api/timer/start", { method: "POST" });
      const data = await response.json();
      
      if (data.success) {
        setTimerData(data.timer);
      } else {
        console.error("Failed to start timer:", data.message);
      }
      
    } catch (error) {
      console.error("Failed to start timer:", error);
    }
  };

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

  const completeWorkout = async (receivedTime) => {
    setDuration(receivedTime);
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
          duration: receivedTime,
          exercises: workoutData
        })
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success('Workout saved successfully!');
        router.push("/activity")
      } else {
        toast.error('Failed to save workout.');
      }
    } catch (error) {
      toast.error('An error occurred while saving the workout:');
    }
  };

  return (
    <>
      <PageHeading title={workout.name} />
      <Button className="gap-unit-1 mb-5" color="success" size="lg" onClick={startWorkoutTimer}>
        <IconPlayerPlay />Start Workout
      </Button>
      {workout.notes && <Notes notes={workout.notes} />}
      <ExerciseList
        exercises={workout.WorkoutPlanExercise}
        workoutData={workoutData}
        handleValueChange={handleValueChange}
        handleAddSet={handleAddSet}
        handleDeleteLastSet={handleDeleteLastSet}
      />
    </>
  );
};

const Notes = ({ notes }) => <div className="text-sm text-gray-500 mb-2">notes: {notes}</div>;

const ExerciseList = ({ exercises, workoutData, handleValueChange, handleAddSet, handleDeleteLastSet }) => (
  <div className="pb-5">
    {exercises.map((exerciseItem, index) => (
      <ExerciseSet 
        key={index}
        exerciseItem={exerciseItem}
        workoutData={workoutData}
        handleValueChange={handleValueChange}
        handleAddSet={handleAddSet}
        handleDeleteLastSet={handleDeleteLastSet}
      />
    ))}
  </div>
);

export default Workout;