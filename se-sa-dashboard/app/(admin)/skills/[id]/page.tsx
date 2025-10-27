'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditItem() {
  const { id } = useParams();
  const r = useRouter();
  const [form, setForm] = useState<any>(null);
  useEffect(()=>{ fetch('/api/admin/skills/'+id).then(r=>r.json()).then(setForm); },[id]);
  if (!form) return null;
  const save = async () => {
    const res = await fetch('/api/admin/skills/'+id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/skills');
  };
  const del = async () => {
    if (!confirm('Delete item?')) return;
    const res = await fetch('/api/admin/skills/'+id, { method: 'DELETE' });
    if (res.ok) r.push('/admin/skills');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Skills — Edit</h1>
      <input className="input" placeholder="Skill name" value={ form.name } onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="input" placeholder="Area (e.g., Payments, React)" value={ form.area } onChange={e=>setForm({...form, area:e.target.value})} />
      <input className="input" placeholder="Level (1–5)" value={ form.level } onChange={e=>setForm({...form, level:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={save} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Save</button>
        <button onClick={del} className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500">Delete</button>
      </div>
    </div>
  );
}
