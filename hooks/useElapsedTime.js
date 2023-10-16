import { useState, useEffect } from 'react';

export function useElapsedTime(timerData, initialTime = 0) {
    const [elapsedTime, setElapsedTime] = useState(initialTime);

    useEffect(() => {
        if (timerData) {
            console.log('elapsedTime:', elapsedTime);

            const now = new Date().getTime();
            const startTime = new Date(timerData.startTime).getTime();
            const pausedDuration = timerData.pausedDuration * 1000; 
            const currentElapsedTime = (now - startTime - pausedDuration) / 1000; 
            setElapsedTime(currentElapsedTime);
        }
    }, [timerData]);

    return [elapsedTime, setElapsedTime];
}
