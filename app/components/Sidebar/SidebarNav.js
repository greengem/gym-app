"use client";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import {
  IconDashboard,
  IconActivity,
  IconJumpRope,
  IconList,
  IconStretching,
  IconLogout,
} from "@tabler/icons-react";

function NavigationMenu() {
  const pathname = usePathname();
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
          );
        })}
      </Listbox>
    </div>
  );
}

export default NavigationMenu;
