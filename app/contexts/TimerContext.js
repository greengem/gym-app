"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerData, setTimerData] = useState(null);

  useEffect(() => {
    console.log("Timer data changed:", timerData);
  }, [timerData]);

  return (
    <TimerContext.Provider value={{ timerData, setTimerData }}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => {
  return useContext(TimerContext);
};
