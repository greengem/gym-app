
import UserDetail from "@/app/components/Sidebar/UserDetail";
import WorkoutTimer from "@/app/components/Timer/WorkoutTimer";
import { Divider } from '@nextui-org/divider';
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import SidebarNav from '@/app/components/Sidebar/SidebarNav'

export default function Sidebar() {
  return (
    <div className="hidden lg:block flex h-screen">
      <div className="bg-gray-200 dark:bg-dark-section w-64 fixed h-full">
        <SidebarNav />
        <Divider />
        <WorkoutTimer />
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
