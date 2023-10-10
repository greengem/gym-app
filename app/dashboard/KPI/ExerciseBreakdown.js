"use client";
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Tooltip, Title } from 'chart.js';
import { CardHeader, CardBody } from '@nextui-org/card';

Chart.register(ArcElement, CategoryScale, Tooltip, Title);

export default function KPIExerciseBreakdown() {
  const data = {
    labels: ['Legs', 'Chest', 'Back', 'Arms', 'Shoulders'],
    datasets: [{
      data: [30, 20, 20, 15, 15],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: -20,
        bottom: -20
      }
    },
    plugins: {
      legend: {
        position: 'right'
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const label = context.label;
            switch(label) {
              case 'Legs':
                return ['Legs: 30%', 'Squats', 'Lunges', 'Deadlifts'];
              case 'Chest':
                return ['Chest: 20%', 'Bench Press', 'Push Ups'];
              default:
                return label;
            }
          }
        }
      }
    }
  };
  

  return (
    <>
      <CardHeader className='px-5 font-semibold'>Exercise Breakdown</CardHeader>
      <CardBody className='p-3' style={{ height: '221px' }}>
        <Pie data={data} options={options} />
      </CardBody>
    </>
  );
}
