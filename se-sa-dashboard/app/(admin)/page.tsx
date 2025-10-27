export default function AdminHome() {
  const cards = [
    { href: "/admin/projects", title: "Projects", desc: "CRUD internal technical work" },
    { href: "/admin/skills", title: "Skills", desc: "Track skills & levels (1–5)" },
    { href: "/admin/activities", title: "Activities", desc: "Demos, workshops, POCs" },
    { href: "/admin/opportunities", title: "Opportunities", desc: "Manual opps (non‑SFDC)" },
  ];
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="opacity-80">Manage your data when Salesforce isn’t enough or for internal initiatives.</p>
      <div className="grid md:grid-cols-2 gap-3">
        {cards.map(c => (
          <a key={c.href} href={c.href} className="rounded-2xl border border-slate-800 p-4 hover:border-slate-700">
            <div className="text-lg font-medium">{c.title}</div>
            <div className="text-sm opacity-70">{c.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
