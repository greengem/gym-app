"use client";
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Tooltip, Title } from 'chart.js';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

Chart.register(ArcElement, CategoryScale, Tooltip, Title);

export default function KPIExerciseBreakdown() {
  const [selectedCategories, setSelectedCategories] = React.useState(['legs', 'chest', 'back', 'arms', 'shoulders']);
  const allLabels = ['Legs', 'Chest', 'Back', 'Arms', 'Shoulders'];
  const allData = [30, 20, 20, 15, 15];
  
  const data = {
    labels: ['Legs', 'Chest', 'Back', 'Arms', 'Shoulders'],
    datasets: [{
      data: [30, 20, 20, 15, 15],
      backgroundColor: ['#0070F0', '#9455D3', '#18C964', '#F5A524', '#F31260']
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
        display: false,
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
    <CardHeader className="flex gap-3">
      <Image
        as={NextImage}
        alt="nextui logo"
        height={40}
        radius="sm"
        src="/icons/tabler-icon-chart-pie.svg"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">Exercise Type Distribution</p>
        <p className="text-small text-default-500">Distribution of Exercise Types</p>
      </div>
    </CardHeader>
      <CardBody className='p-3' style={{ height: '221px' }}>
        <Pie data={data} options={options} />
      </CardBody>
      <CardFooter>
        <CheckboxGroup
          size='sm'
          orientation="horizontal"
          defaultValue={["legs", "chest", "back", "arms", "shoulders"]}
        >
          <Checkbox color='primary' value="legs">Legs</Checkbox>
          <Checkbox color='secondary' value="chest">Chest</Checkbox>
          <Checkbox color='success' value="back">Back</Checkbox>
          <Checkbox color='warning' value="arms">Arms</Checkbox>
          <Checkbox color='danger' value="shoulders">Shoulders</Checkbox>
        </CheckboxGroup>
      </CardFooter>
    </>
  );
}
