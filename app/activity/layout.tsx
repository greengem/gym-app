import Sidebar from "../components/Sidebar"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="ml-0 lg:ml-64 flex-1 px-5">
        {children}
      </div>
    </main>
  );
}
