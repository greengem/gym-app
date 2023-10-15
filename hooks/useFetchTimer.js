import { useState, useEffect } from 'react';

function useFetchTimer() {
  const [timerData, setTimerData] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    async function fetchTimer() {
      try {
        const response = await fetch("/api/timer/current");
        const { success, timer: fetchedTimer } = await response.json();

        if (success && fetchedTimer) {
          const startTime = new Date(fetchedTimer.startTime).getTime();
          const now = new Date().getTime();
          const pausedDuration = fetchedTimer.pausedDuration * 1000;
          const initialElapsedTime = (now - startTime - pausedDuration) / 1000;

          setElapsedTime(initialElapsedTime);
          setTimerData(fetchedTimer);
        }
      } catch (error) {
        console.error("Failed to fetch timer:", error);
      }
    }

    fetchTimer();
  }, []);

  return { timerData, setTimerData, elapsedTime, setElapsedTime };
}

export default useFetchTimer;
