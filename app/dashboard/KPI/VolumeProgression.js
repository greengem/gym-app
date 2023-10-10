"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody } from '@nextui-org/card';

Chart.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

export default function KPIVolumeProgression() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Total Weight Lifted',
        data: [5000, 5200, 5400, 5300, 5500],
        type: 'bar',
        backgroundColor: '#FFCE56',
      },
      {
        label: 'Squat',
        data: [100, 110, 120, 115, 125],
        type: 'line',
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: 'Deadlift',
        data: [150, 160, 170, 165, 175],
        type: 'line',
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'Bench Press',
        data: [90, 95, 100, 98, 105],
        type: 'line',
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
          text: 'Weight Lifted (kg)'
        }
      }
    },
  };

  return (
    <>
        <CardHeader>Volume Progression</CardHeader>
        <CardBody>
            <Bar data={data} options={options} />
        </CardBody>
    </>
  );
}