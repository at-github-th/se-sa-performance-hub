'use client';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function Home() {
  const [pipeline, setPipeline] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [kpi, setKpi] = useState<any>(null);

  useEffect(() => {
    fetch('/api/demo/pipeline').then(r=>r.json()).then(setPipeline);
    fetch('/api/demo/projects').then(r=>r.json()).then(setProjects);
    fetch('/api/kpi/latest').then(r=>r.json()).then(setKpi);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">SE/SA Personal Dashboard</h1>
        <div className="space-x-2">
          <button className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500" onClick={()=>fetch('/api/sf/sync', { method: 'POST'})}>Sync Salesforce</button>
          <a href="/admin" className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Admin</a>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commercial */}
        <section className="rounded-2xl p-4 bg-slate-900/60 border border-slate-800">
          <h2 className="text-xl mb-2">Commercial</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={pipeline}>
                <XAxis dataKey="stage"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 text-sm space-y-1">
            <li>Win rate: <span className="font-medium">{kpi?.winRate!=null ? (kpi.winRate*100).toFixed(1)+'%' : '—'}</span></li>
            <li>Pipeline coverage: <span className="font-medium">{kpi?.pipelineCoverage!=null ? (kpi.pipelineCoverage*100).toFixed(1)+'%' : '—'}</span></li>
            <li>Avg cycle time: <span className="font-medium">{kpi?.cycleTimeDays!=null ? kpi.cycleTimeDays.toFixed(1)+' days' : '—'}</span></li>
            <li>SE Load Index: <span className="font-medium">{kpi?.seLoadIndex!=null ? kpi.seLoadIndex.toFixed(1) : '—'}</span></li>
            <li>Skills Index: <span className="font-medium">{kpi?.skillsIndex!=null ? kpi.skillsIndex.toFixed(2) : '—'}</span></li>
          </ul>
        </section>

        {/* Technical */}
        <section className="rounded-2xl p-4 bg-slate-900/60 border border-slate-800">
          <h2 className="text-xl mb-2">Engineering</h2>
          <div className="grid gap-2">
            {projects.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-800 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs opacity-70">{p.category} • {p.status}</div>
                  </div>
                  <a href="/admin/projects" className="text-xs px-2 py-1 rounded-lg bg-slate-800">Open</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
