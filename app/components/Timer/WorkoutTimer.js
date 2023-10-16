"use client";
import React, { useEffect } from 'react';

import { TimeDisplay } from '@/app/components/Timer/TimeDisplay';
//import { TimerButtons } from '@/app/components/Timer/TimerButtons';

import useFetchTimer from '@/hooks/useFetchTimer';
import useTimerInterval from '@/hooks/useTimerInterval';
import useStartTimer from '@/hooks/useStartTimer';

export default function WorkoutTimer() {
  const { timerData, setTimerData, elapsedTime, setElapsedTime } = useFetchTimer();
  useTimerInterval(timerData, setElapsedTime);
  const startTimer = useStartTimer(setTimerData);

  return (
    <div className="text-center p-5">
      <TimeDisplay seconds={elapsedTime} />
    </div>
  );
}
