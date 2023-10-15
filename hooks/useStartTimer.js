// useStartTimer.js

async function useStartTimer(setTimerData) {
    const startTimer = async () => {
      try {
        const response = await fetch("/api/timer/start", { method: "POST" });
        const { success, timer: newTimer } = await response.json();
        if (success) {
          setTimerData({ ...newTimer, status: 'RUNNING' });
        }
      } catch (error) {
        console.error("Failed to start timer:", error);
      }
    };
  
    return startTimer;
  }
  
  export default useStartTimer;
  