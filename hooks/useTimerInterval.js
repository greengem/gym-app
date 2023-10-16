import { useEffect } from 'react';

function useTimerInterval(timerData, setElapsedTime) {
  useEffect(() => {
    let interval;
    console.log('Updating elapsedTime');
    console.log('Updating elapsedTime');

    if (timerData && timerData.status === 'RUNNING') {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1); 
      }, 1000);
    } else if (timerData && timerData.status === 'PAUSED') {
      clearInterval(interval);
    }

    return () => clearInterval(interval); 
  }, [timerData, setElapsedTime]);

}

export default useTimerInterval;
