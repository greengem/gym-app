"use client";
import React from 'react';
import { useStopwatch } from '@/app/contexts/SimpleTimerContext';

const TimeDisplay = () => {
  const { time } = useStopwatch();

  return (
    <div>
      <h1>Stopwatch Time: {time} seconds</h1>
    </div>
  );
};

export default TimeDisplay;
