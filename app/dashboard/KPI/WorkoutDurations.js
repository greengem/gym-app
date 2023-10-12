"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

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
        <p className="text-md">Training Session Durations</p>
        <p className="text-small text-default-500">Time Spent Per Training Session</p>
      </div>
    </CardHeader>
      <CardBody className='p-3'>
        <Line data={data} options={options} />
      </CardBody>
      <CardFooter>
        <CheckboxGroup
          size='sm'
          orientation="horizontal"
          color="secondary"
          defaultValue={["duration"]}
        >
          <Checkbox value="duration">Duration</Checkbox>
        </CheckboxGroup>
      </CardFooter>
    </div>
  );
}
