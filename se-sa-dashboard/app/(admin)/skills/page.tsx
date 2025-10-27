'use client';
import { useEffect, useState } from 'react';

type Item = { id: string; title?: string; name?: string; status?: string; area?: string; level?: number; kind?: string; date?: string; };
export default function List() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(()=>{ fetch('/api/admin/skills').then(r=>r.json()).then(setItems); },[]);
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Skills</h1>
        <a href="/admin/skills/new" className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500">New</a>
      </div>
      <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800">
        {items.map(i => (
          <a key={i.id} href={"/admin/skills/"+i.id} className="block p-3 hover:bg-slate-900/60">
            <div className="font-medium">{i.name}</div>
            <div className="text-xs opacity-70">{i.area} • L{ i.level }</div>
          </a>
        ))}
      </div>
    </div>
  );
}
