"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';
import { CardHeader, CardBody } from '@nextui-org/card';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title);

export default function KPIWorkoutFreqOverTime() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Strength',
        data: [5, 8, 4, 6, 7],
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: 'Cardio',
        data: [8, 6, 7, 5, 8],
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'Flexibility',
        data: [3, 4, 5, 4, 6],
        borderColor: '#FFCE56',
        fill: false,
      },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Number of Workouts'
        }
      }
    },
  };

  return (
    <>
    <CardHeader>Workout Frequency Over Time</CardHeader>
    <CardBody>
        <Line data={data} options={options} />
    </CardBody>
    </>
  );
}
