import Sidebar from "../components/Sidebar"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-grow">
        <Sidebar />
        <div className="ml-0 lg:ml-64 flex-1 px-5">
          {children}
        </div>
      </main>
    </div>

  );
}
