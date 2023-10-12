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
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

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
          <div className="px-5 py-5"><ThemeSwitcher /></div>

          <div className="absolute bottom-0 left-0 right-0">
            <Divider />
              <div className="px-5 py-3">
                <UserDetail />
              </div>
            </div>


        </div>
    </div>
  );
}
