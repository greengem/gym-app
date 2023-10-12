import Sidebar from "@/app/components/Sidebar"
import NavMenu from '@/app/components/NavMenu'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="ml-0 lg:ml-64 flex-1 px-5">
          <NavMenu />
          {children}
        </div>
      </div>
    </main>
  );
}
