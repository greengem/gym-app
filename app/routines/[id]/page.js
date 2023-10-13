"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

import PageHeading from "@/app/components/PageHeading";
import NewRoutineTable from "@/app/routines/components/NewRoutineTable";
import NewRoutineModal from "@/app/routines/components/NewRoutineModal";

import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from '@nextui-org/card';

import { IconDeviceFloppy } from "@tabler/icons-react";

export default function EditRoutine({ params }){
    const editId = params.id;

    const [routineName, setRoutineName] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchRoutineDetails = async () => {
            try {
                const response = await fetch(`/api/routines/${editId}`);
                const data = await response.json();
                console.log("Routine details from API:", data);
                if (response.ok) {
                    setRoutineName(data.name);
                    setNotes(data.notes);
                    setSelectedExercises(data.WorkoutPlanExercise);
                } else {
                    toast.error("Failed to fetch routine details.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching routine details.");
            }
        };
        
        fetchRoutineDetails();
    }, [editId]);

    const handleSave = async () => {

        try {
            const response = await fetch(`/api/routines/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    routineName,
                    notes,
                    exercises: selectedExercises
                })
            });

            if (response.ok) {
                toast.success("Routine updated successfully!");
                router.push("/routines");
            } else {
                toast.error("Failed to update routine.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }

    return(
        <>
            <PageHeading title="Edit Routine" />
            <Card className='mb-5'>
                <CardBody>
            <Input 
                isRequired 
                type="text" 
                label="Routine Name" 
                placeholder="Enter a name for your Routine" 
                className="mb-3"
                value={routineName}
                onChange={e => setRoutineName(e.target.value)} 
            />
            <Textarea 
                labelPlacement="inside" 
                label="Notes" 
                placeholder="(Optional) Add some notes to your routine" 
                value={notes}
                onChange={e => setNotes(e.target.value)}
            />
            </CardBody>
            </Card>
            <Card className='mb-5'>
                <CardBody>
                    <NewRoutineModal setSelectedExercises={setSelectedExercises} />
                    <NewRoutineTable selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} />
                </CardBody>
            </Card>
            <Button color="danger" onClick={handleSave} className='gap-unit-1 mb-5'>
                <IconDeviceFloppy size={16} />Save Routine
            </Button>
        </>
    )
}