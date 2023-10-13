"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

import PageHeading from "../../components/PageHeading";
import NewRoutineTable from "./NewRoutineTable";
import NewRoutineModal from "./NewRoutineModal";

import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from '@nextui-org/card';

import { IconDeviceFloppy } from "@tabler/icons-react";

export default function NewRoutinePage() {
    const [routineName, setRoutineName] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const router = useRouter()

    const handleSave = async () => {
        if (!routineName.trim()) {
            toast.error("Routine Name is required!");
            return;
        }
    
        if (selectedExercises.length === 0) {
            toast.error("Please select at least one exercise!");
            return;
        }
    
        const data = {
            routineName,
            notes,
            exercises: selectedExercises
        };
    
        try {
            const response = await fetch('/api/routines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                const result = await response.json();
                toast.success("Routine saved successfully!");
                router.push("/routines")
            } else {
                toast.error("Failed to save routine.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }
    

    return (
        <>
            <PageHeading title="New Routine" />
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
    );
}
