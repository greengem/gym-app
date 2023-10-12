"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

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
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div>
          <CardHeader className="flex gap-3">
      <Image
        as={NextImage}
        alt="nextui logo"
        height={40}
        radius="sm"
        src="/icons/tabler-icon-chart-line.svg"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">Calories Burned</p>
        <p className="text-small text-default-500">Total Energy Expended Across Workouts</p>
      </div>
    </CardHeader>
      <CardBody className='p-3'>
        <Bar data={data} options={options} />
      </CardBody>
      <CardFooter>
        <CheckboxGroup
          size='sm'
          orientation="horizontal"
          color="secondary"
          defaultValue={["calories", "total"]}
        >
          <Checkbox value="calories">Calories Burned per Session</Checkbox>
          <Checkbox value="total">Weekly Total</Checkbox>
        </CheckboxGroup>
      </CardFooter>
    </div>
  );
}
