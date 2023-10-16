
import UserDetail from "@/app/components/Sidebar/UserDetail";
//import WorkoutTimer from "@/app/components/Timer/WorkoutTimer";
//import TimerButtons from "@/app/components/Timer/TimerButtons";
import { Divider } from '@nextui-org/divider';
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
//import SidebarNav from '@/app/components/Sidebar/SidebarNav'

import TimeDisplay from '@/app/components/Timer/SimpleTimer';
import Controls from '@/app/components/Timer/SimpleControls';

import {Link} from "@nextui-org/link";
import NextLink from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden lg:block flex h-screen">
      <div className="bg-gray-200 dark:bg-dark-section w-64 fixed h-full">
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/activity">Activity</Link></li>
          <li><Link href="/workout">Workout</Link></li>
          <li><Link href="/routines">Routines</Link></li>
          <li><Link href="/exercises">Exercises</Link></li>
        </ul>
        {/*<SidebarNav />*/}
        <Divider />
        <TimeDisplay />
        <Controls />
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
