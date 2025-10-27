'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditItem() {
  const { id } = useParams();
  const r = useRouter();
  const [form, setForm] = useState<any>(null);
  useEffect(()=>{ fetch('/api/admin/projects/'+id).then(r=>r.json()).then(setForm); },[id]);
  if (!form) return null;
  const save = async () => {
    const res = await fetch('/api/admin/projects/'+id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/projects');
  };
  const del = async () => {
    if (!confirm('Delete item?')) return;
    const res = await fetch('/api/admin/projects/'+id, { method: 'DELETE' });
    if (res.ok) r.push('/admin/projects');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Projects — Edit</h1>
      <input className="input" placeholder="Title" value={ form.title } onChange={e=>setForm({...form, title:e.target.value})} />
      <input className="input" placeholder="Category" value={ form.category } onChange={e=>setForm({...form, category:e.target.value})} />
      <select className="input" value={ form.status } onChange={e=>setForm({...form, status:e.target.value})}><option key="PLANNING">PLANNING</option><option key="ACTIVE">ACTIVE</option><option key="BLOCKED">BLOCKED</option><option key="DONE">DONE</option></select>
      <textarea className="input" placeholder="Description" value={ form.description } onChange={e=>setForm({...form, description:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={save} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Save</button>
        <button onClick={del} className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500">Delete</button>
      </div>
    </div>
  );
}
