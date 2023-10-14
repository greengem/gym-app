"use client";
import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import UserDetail from "./UserDetail";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import {
  IconDashboard,
  IconActivity,
  IconJumpRope,
  IconList,
  IconStretching,
  IconLogout,
} from "@tabler/icons-react";
import { Divider } from '@nextui-org/divider';
import {Button, Image} from "@nextui-org/react";
import NextImage from "next/image";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

export default function Sidebar() {
  const pathname = usePathname()
  const sidebarItems = [
    {
      key: "dashboard",
      description: "See your Progress",
      startContent: <IconDashboard />,
      text: "Dashboard",
      url: "/dashboard",
    },
    {
      key: "activity",
      description: "View Past Workouts",
      startContent: <IconActivity />,
      text: "Activity",
      url: "/activity",
    },
    {
      key: "workout",
      description: "Log your Workouts",
      startContent: <IconJumpRope />,
      text: "Start Workout",
      url: "/workout",
    },
    {
      key: "routines",
      description: "Create a list of Exercises",
      startContent: <IconList />,
      text: "Routines",
      url: "/routines",
    },
    {
      key: "exercises",
      description: "Browse over 800 exercises",
      startContent: <IconStretching />,
      text: "Exercises",
      url: "/exercises",
    },
    {
      key: "logout",
      description: "Give up",
      startContent: <IconLogout />,
      text: "Sign Out",
      url: "/api/auth/signout",
      className: "text-danger",
      color: "danger",
    },
  ];

  return (
    <div className="hidden lg:block flex h-screen">
      <div className="bg-gray-200 dark:bg-dark-section w-64 fixed h-full">
        <div className="p-2">

          <Listbox aria-label="Actions" variant="flat">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.url;
              
              return (
                <ListboxItem
                  as={Link}
                  href={item.url}
                  key={item.key}
                  description={item.description}
                  startContent={item.startContent}
                  className={isActive ? "text-primary " + (item.className || "") : item.className}
                  color={isActive ? "primary" : item.color}
                >
                  {item.text}
                </ListboxItem>
              )
            })}
          </Listbox>
          </div>
          <Divider />
          <div className="text-center p-5">
            <p className="text-warning">Workout Paused</p>
            <p className="text-6xl mt-2 mb-4">48:32</p>
            <div className="flex gap-2 justify-center">
              <Button isDisabled color="success" isIconOnly><IconPlayerPlay /></Button>
              <Button color="warning" isIconOnly><IconPlayerPause /></Button>
              <Button color="danger" isIconOnly><IconPlayerStop /></Button>
            </div>
          </div>
          <Divider />

          <div className="absolute bottom-0 left-0 right-0">
          <div className="px-5 py-5"><ThemeSwitcher /></div>
            <Divider />
              <div className="px-5 py-3">
                <UserDetail />
              </div>
            </div>
        </div>
    </div>
  );
}
