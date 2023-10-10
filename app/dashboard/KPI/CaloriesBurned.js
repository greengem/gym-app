"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody } from '@nextui-org/card';

Chart.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

export default function KPICaloriesBurned() {
  const data = {
    labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
    datasets: [
      {
        label: 'Calories Burned per Session',
        data: [500, 600, 450, 700, 550, 650, 480],
        type: 'bar',
        backgroundColor: '#FFCE56',
      },
      {
        label: 'Weekly Total',
        data: [500, 1100, 1550, 2250, 2800, 3450, 3930],
        type: 'line',
        borderColor: '#FF6384',
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
          text: 'Date'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Calories Burned'
        }
      }
    },
  };

  return (
    <div>
      <CardHeader>Calories Burned</CardHeader>
      <CardBody className='p-3'>
        <Bar data={data} options={options} />
      </CardBody>
    </div>
  );
}
