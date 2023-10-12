"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

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
        <p className="text-md">Strength Estimations (1RM)</p>
        <p className="text-small text-default-500">Predicted Strength Levels for Single Repetitions</p>
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
          defaultValue={["squat", "deadlift", "benchpress"]}
        >
          <Checkbox value="squat">Squat</Checkbox>
          <Checkbox value="deadlift">Deadlift</Checkbox>
          <Checkbox value="benchpress">Bench Press</Checkbox>
        </CheckboxGroup>
      </CardFooter>
    </div>
  );
}
