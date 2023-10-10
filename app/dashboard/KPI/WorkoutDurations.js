"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody } from '@nextui-org/card';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

export default function KPIWorkoutDurations() {
  const data = {
    labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
    datasets: [
      {
        label: 'Duration (minutes)',
        data: [45, 60, 50, 75, 65, 55, 80],
        borderColor: '#36A2EB',
        fill: false,
      }
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
          text: 'Date'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Duration (minutes)'
        },
        ticks: {
          beginAtZero: true,
        }
      }
    },
  };

  return (
    <div>
      <CardHeader className='px-5 font-semibold'>Duration of Workouts</CardHeader>
      <CardBody className='p-3'>
        <Line data={data} options={options} />
      </CardBody>
    </div>
  );
}
