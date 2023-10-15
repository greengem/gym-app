"use client";
import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerData, setTimerData] = useState(null);

  return (
    <TimerContext.Provider value={{ timerData, setTimerData }}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => {
  return useContext(TimerContext);
};
