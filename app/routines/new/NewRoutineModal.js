"use client";
import { useState, useEffect, useCallback } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Input } from "@nextui-org/input";

import { IconPlus, IconDeviceFloppy } from "@tabler/icons-react";

function NewRoutineModal({ setSelectedExercises }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = useCallback(async () => {
        if (query.length < 2) {
            setResults([]);
            return;
        }
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        setResults(data);
    }, [query]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                handleSearch();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, handleSearch]);

    return (
        <>
            <Button color="primary" onPress={onOpen} className="mb-5 gap-unit-1">
                <IconPlus size={16} />Add Exercises
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Exercises</ModalHeader>
                            <ModalBody>
                                <Input 
                                    type="search" 
                                    label="Search" 
                                    placeholder="Search for Exercises" 
                                    value={query} 
                                    onChange={(e) => setQuery(e.target.value)} 
                                />

                                <Table 
                                    removeWrapper 
                                    aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>ACTION</TableColumn>
                                    </TableHeader>
                                    <TableBody emptyContent={"Type in the search bar to get started."}>
                                        {results.map(exercise => (
                                            <TableRow key={exercise.id}>
                                                <TableCell>{exercise.name}</TableCell>
                                                <TableCell>
                                                <Button 
                                                    size='sm' 
                                                    color='primary'
                                                    onClick={() => {
                                                        const newExercise = {
                                                            ...exercise,
                                                            sets: 3,
                                                            reps: 8,
                                                            duration: 0
                                                        };
                                                        setSelectedExercises(prevExercises => [...prevExercises, newExercise]);
                                                        onClose();
                                                    }}
                                                >
                                                    Add
                                                </Button>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose} className='gap-unit-1'>
                                    <IconDeviceFloppy size={16} />Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default NewRoutineModal;
