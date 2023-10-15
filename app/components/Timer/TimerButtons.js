import React from 'react';
import { Button } from "@nextui-org/button";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

export const TimerButtons = ({ status, onStart }) => {
  if (!status || status === 'NOT_STARTED' || status === 'PAUSED') {
    return (
      <Button color="success" isIconOnly onClick={onStart}>
        <IconPlayerPlay />
      </Button>
    );
  } else if (status === 'RUNNING') {
    return (
      <Button color="warning" isIconOnly>
        <IconPlayerPause />
      </Button>
    );
  }
};
