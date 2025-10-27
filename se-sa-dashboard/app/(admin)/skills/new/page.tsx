'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewItem() {
  const r = useRouter();
  const [form, setForm] = useState({ name: '', area: '', level: 1 });
  const submit = async () => {
    const res = await fetch('/api/admin/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/skills');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Skills — New</h1>
      <input className="input" placeholder="Skill name" value={ form.name } onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="input" placeholder="Area (e.g., Payments, React)" value={ form.area } onChange={e=>setForm({...form, area:e.target.value})} />
      <input className="input" placeholder="Level (1–5)" value={ form.level } onChange={e=>setForm({...form, level:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={submit} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Create</button>
        <a href="/admin/skills" className="px-3 py-2 rounded-xl bg-slate-800">Cancel</a>
      </div>
    </div>
  );
}
