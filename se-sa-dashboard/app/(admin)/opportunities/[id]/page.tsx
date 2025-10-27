'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditItem() {
  const { id } = useParams();
  const r = useRouter();
  const [form, setForm] = useState<any>(null);
  useEffect(()=>{ fetch('/api/admin/opportunities/'+id).then(r=>r.json()).then(setForm); },[id]);
  if (!form) return null;
  const save = async () => {
    const res = await fetch('/api/admin/opportunities/'+id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/opportunities');
  };
  const del = async () => {
    if (!confirm('Delete item?')) return;
    const res = await fetch('/api/admin/opportunities/'+id, { method: 'DELETE' });
    if (res.ok) r.push('/admin/opportunities');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Opportunities — Edit</h1>
      <input className="input" placeholder="ID (leave blank for cuid)" value={ form.id } onChange={e=>setForm({...form, id:e.target.value})} />
      <input className="input" placeholder="Name" value={ form.name } onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="input" placeholder="Account Name" value={ form.accountName } onChange={e=>setForm({...form, accountName:e.target.value})} />
      <input className="input" placeholder="Stage" value={ form.stageName } onChange={e=>setForm({...form, stageName:e.target.value})} />
      <input className="input" placeholder="Amount" value={ form.amount } onChange={e=>setForm({...form, amount:e.target.value})} />
      <input className="input" placeholder="Close Date (YYYY-MM-DD)" value={ form.closeDate } onChange={e=>setForm({...form, closeDate:e.target.value})} />
      <input className="input" placeholder="Owner Email" value={ form.ownerEmail } onChange={e=>setForm({...form, ownerEmail:e.target.value})} />
      <input className="input" placeholder="Probability" value={ form.probability } onChange={e=>setForm({...form, probability:e.target.value})} />
      <input className="input" placeholder="Type" value={ form.type } onChange={e=>setForm({...form, type:e.target.value})} />
      <input className="input" placeholder="Region" value={ form.region } onChange={e=>setForm({...form, region:e.target.value})} />
      <input className="input" placeholder="Industry" value={ form.industry } onChange={e=>setForm({...form, industry:e.target.value})} />
      <div className="flex gap-2">
        <button onClick={save} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Save</button>
        <button onClick={del} className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500">Delete</button>
      </div>
    </div>
  );
}
