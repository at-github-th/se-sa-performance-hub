export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur p-3">
        <div className="max-w-6xl mx-auto flex gap-4 text-sm">
          <a href="/" className="opacity-80 hover:opacity-100">← Dashboard</a>
          <a href="/admin/projects" className="hover:underline">Projects</a>
          <a href="/admin/skills" className="hover:underline">Skills</a>
          <a href="/admin/activities" className="hover:underline">Activities</a>
          <a href="/admin/opportunities" className="hover:underline">Opportunities</a>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
