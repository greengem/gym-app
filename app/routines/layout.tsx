export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="max-w-screen-xl mx-auto">
      <div className="container mx-auto px-5">
        {children}
      </div>
    </main>
  );
}
