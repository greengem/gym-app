"use client";
import { useState, useEffect } from "react";
import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop, IconDeviceFloppy } from "@tabler/icons-react";

export default function NavControls({ onSave, onTimeSave }) {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isActive) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const handlePlay = () => setIsActive(true);
    const handlePause = () => setIsActive(false);
    const handleStop = () => {
        setIsActive(false);
        setIsStopped(true);
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return (
        <Navbar maxWidth="full">
            <NavbarContent className="gap-2" justify="start">
            {
                !isStopped && (isActive 
                    ? <Button isIconOnly color="warning" className="gap-unit-1" onClick={handlePause}>
                        <IconPlayerPause size={20} />
                    </Button>
                    : <Button isIconOnly color="success" className="gap-unit-1" onClick={handlePlay}>
                        <IconPlayerPlay size={20} />
                    </Button>)
            }

                <Button color="danger" className="gap-unit-1" onClick={handleStop}>
                    <IconPlayerStop size={20} /> Finish Workout
                </Button>
                {
    isStopped && (
        <>
            <Button color="primary" className="gap-unit-1" onClick={() => {onSave(time);}}>
                <IconDeviceFloppy size={20} /> Save Workout
            </Button>
        </>
    )
}


            </NavbarContent>
            <NavbarContent justify="end">
                <p className={`text-4xl ${isStopped ? 'text-success' : ''}`}>{formatTime(time)}</p>
            </NavbarContent>
        </Navbar>
    );
}
