"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody } from '@nextui-org/card';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

export default function KPIOneRM() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Squat 1RM',
        data: [120, 125, 130, 128, 132],
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: 'Deadlift 1RM',
        data: [160, 165, 170, 168, 172],
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'Bench Press 1RM',
        data: [100, 105, 110, 108, 112],
        borderColor: '#4BC0C0',
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
  };

  return (
    <div>
      <CardHeader className='px-5 font-semibold'>One-Rep Max (1RM) Estimations</CardHeader>
      <CardBody className='p-3'>
        <Line data={data} options={options} />
      </CardBody>
    </div>
  );
}
