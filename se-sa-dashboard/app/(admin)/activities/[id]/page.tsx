'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditItem() {
  const { id } = useParams();
  const r = useRouter();
  const [form, setForm] = useState<any>(null);
  useEffect(()=>{ fetch('/api/admin/activities/'+id).then(r=>r.json()).then(setForm); },[id]);
  if (!form) return null;
  const save = async () => {
    const res = await fetch('/api/admin/activities/'+id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/activities');
  };
  const del = async () => {
    if (!confirm('Delete item?')) return;
    const res = await fetch('/api/admin/activities/'+id, { method: 'DELETE' });
    if (res.ok) r.push('/admin/activities');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Activities — Edit</h1>
      <input className="input" placeholder="Kind (Demo, Workshop, POC)" value={ form.kind } onChange={e=>setForm({...form, kind:e.target.value})} />
      <input className="input" placeholder="Title" value={ form.title } onChange={e=>setForm({...form, title:e.target.value})} />
      <input className="input" placeholder="Date (YYYY-MM-DD)" value={ form.date } onChange={e=>setForm({...form, date:e.target.value})} />
      <input className="input" placeholder="Related Opp Id (optional)" value={ form.relatedOppId } onChange={e=>setForm({...form, relatedOppId:e.target.value})} />
      <input className="input" placeholder="Related Project Id (optional)" value={ form.relatedProjectId } onChange={e=>setForm({...form, relatedProjectId:e.target.value})} />
      <textarea className="input" placeholder="Notes" value={ form.notes } onChange={e=>setForm({...form, notes:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={save} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Save</button>
        <button onClick={del} className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500">Delete</button>
      </div>
    </div>
  );
}
