"use client";
import React from "react";
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

export default function Sidebar() {
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
      className: "text-danger", // Add custom class for text color
      color: "danger", // Add custom color
    },
  ];

  return (
    <div className="hidden lg:block flex h-screen">
      <div className="bg-dark-section text-white w-64 fixed h-full">
        <div className="p-3">
          <UserDetail />
          <Listbox aria-label="Actions" variant="flat">
            {sidebarItems.map((item) => (
              <ListboxItem
                as={Link}
                href={item.url}
                key={item.key}
                description={item.description}
                startContent={item.startContent}
                className={item.className} // Conditionally apply the class
                color={item.color} // Conditionally apply the color
              >
                {item.text}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </div>
  );
}
