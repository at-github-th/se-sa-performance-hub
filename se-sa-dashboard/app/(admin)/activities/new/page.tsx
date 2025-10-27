'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewItem() {
  const r = useRouter();
  const [form, setForm] = useState({ kind:'Demo', title:'', date:'', relatedOppId:'', relatedProjectId:'', notes:'' });
  const submit = async () => {
    const res = await fetch('/api/admin/activities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/activities');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Activities — New</h1>
      <input className="input" placeholder="Kind (Demo, Workshop, POC)" value={ form.kind } onChange={e=>setForm({...form, kind:e.target.value})} />
      <input className="input" placeholder="Title" value={ form.title } onChange={e=>setForm({...form, title:e.target.value})} />
      <input className="input" placeholder="Date (YYYY-MM-DD)" value={ form.date } onChange={e=>setForm({...form, date:e.target.value})} />
      <input className="input" placeholder="Related Opp Id (optional)" value={ form.relatedOppId } onChange={e=>setForm({...form, relatedOppId:e.target.value})} />
      <input className="input" placeholder="Related Project Id (optional)" value={ form.relatedProjectId } onChange={e=>setForm({...form, relatedProjectId:e.target.value})} />
      <textarea className="input" placeholder="Notes" value={ form.notes } onChange={e=>setForm({...form, notes:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={submit} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Create</button>
        <a href="/admin/activities" className="px-3 py-2 rounded-xl bg-slate-800">Cancel</a>
      </div>
    </div>
  );
}
