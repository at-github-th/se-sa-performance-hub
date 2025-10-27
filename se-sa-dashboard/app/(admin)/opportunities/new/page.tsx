'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewItem() {
  const r = useRouter();
  const [form, setForm] = useState({ id:'', name:'', accountName:'', stageName:'Prospecting', amount:'', closeDate:'', ownerEmail:'', probability:'', type:'', region:'', industry:'' });
  const submit = async () => {
    const res = await fetch('/api/admin/opportunities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)});
    if (res.ok) r.push('/admin/opportunities');
  };
  return (
    <div className="grid gap-3 max-w-xl">
      <h1 className="text-xl font-semibold">Opportunities — New</h1>
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
        <button onClick={submit} className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500">Create</button>
        <a href="/admin/opportunities" className="px-3 py-2 rounded-xl bg-slate-800">Cancel</a>
      </div>
    </div>
  );
}
