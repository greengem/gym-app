"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

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
      {
        label: 'Other Exercises',
        data: [4660, 4835, 5010, 4922, 5095],
        type: 'line',
        borderColor: '#9966FF',
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
    <>
    <CardHeader className="flex gap-3 bg-gray-800">
      <Image
        as={NextImage}
        alt="nextui logo"
        height={40}
        radius="sm"
        src="/icons/tabler-icon-chart-bar.svg"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">Load Progress Over Time</p>
        <p className="text-small text-default-500">Tracking Load Increases Over Time</p>
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
          defaultValue={["totalweight", "squat", "deadlift", "benchpress", "other"]}
        >
          <Checkbox value="totalweight">Total Weight</Checkbox>
          <Checkbox value="squat">Squat</Checkbox>
          <Checkbox value="deadlift">Deadlift</Checkbox>
          <Checkbox value="benchpress">Bench Press</Checkbox>
          <Checkbox value="other">Other</Checkbox>
        </CheckboxGroup>
      </CardFooter>
    </>
  );
}
