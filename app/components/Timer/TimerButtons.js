"use client";
import React from 'react';
import { Button } from "@nextui-org/button";
import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

export default function TimerButtons() {
  return (
    <div className='flex justify-center mb-5 gap-2'>
      <Button color='success' isIconOnly>
        <IconPlayerPlay />
      </Button>
      <Button color='warning' isIconOnly>
        <IconPlayerPause />
      </Button>
      <Button color='danger' isIconOnly>
        <IconPlayerStop />
      </Button>
    </div>
  )
}
