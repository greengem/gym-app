"use client";
import React, { useEffect } from 'react';

import { TimeDisplay } from '@/app/components/Timer/TimeDisplay';
import { TimerButtons } from '@/app/components/Timer/TimerButtons';

import useFetchTimer from '@/hooks/useFetchTimer';
import useTimerInterval from '@/hooks/useTimerInterval';
import useStartTimer from '@/hooks/useStartTimer';

export default function WorkoutTimer() {
  const { timerData, setTimerData, elapsedTime, setElapsedTime } = useFetchTimer();
  useTimerInterval(timerData, setElapsedTime);
  const startTimer = useStartTimer(setTimerData);

  return (
    <div className="text-center p-5">
      <p className="text-success">Workout Active</p>
      <TimeDisplay seconds={elapsedTime} />
      <div className="flex gap-2 justify-center">
        <TimerButtons status={timerData?.status} onStart={startTimer} />
      </div>
    </div>
  );
}