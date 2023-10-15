import React from 'react';
import { formatTime } from '@/utils/formatTime';

export const TimeDisplay = ({ seconds }) => {
  const formattedTime = formatTime(seconds);
  return (
    <p className="text-5xl mt-2 mb-4">{formattedTime}</p>
  );
};
