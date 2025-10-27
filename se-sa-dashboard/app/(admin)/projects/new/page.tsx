'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewItem() {
  const r = useRouter();
  const [form, setForm] = useState({ title: '', category: '', status: 'PLANNING', description: '' });
  const submit = async () => {
    const res = await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/projects');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Projects — New</h1>
      <input className="input" placeholder="Title" value={ form.title } onChange={e=>setForm({...form, title:e.target.value})} />
      <input className="input" placeholder="Category" value={ form.category } onChange={e=>setForm({...form, category:e.target.value})} />
      <select className="input" value={ form.status } onChange={e=>setForm({...form, status:e.target.value})}><option key="PLANNING">PLANNING</option><option key="ACTIVE">ACTIVE</option><option key="BLOCKED">BLOCKED</option><option key="DONE">DONE</option></select>
      <textarea className="input" placeholder="Description" value={ form.description } onChange={e=>setForm({...form, description:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={submit} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Create</button>
        <a href="/admin/projects" className="px-3 py-2 rounded-xl bg-slate-800">Cancel</a>
      </div>
    </div>
  );
}
