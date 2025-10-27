import { prisma } from '@/lib/prisma';
import { soql, getSfAuth } from '@/lib/sf';

export async function POST() {
  const auth = await getSfAuth(); // implement secure token retrieval
  type Row = {
    Id: string; Name: string; StageName: string; Amount?: number; CloseDate?: string;
    Probability?: number; Type?: string; Owner?: { Email?: string }; Account?: { Name?: string };
    Industry?: string;
  };
  const rows = await soql<Row>(auth, `SELECT Id, Name, StageName, Amount, CloseDate, Probability, Type, Owner.Email, Account.Name, Industry FROM Opportunity WHERE IsDeleted = false`);
  for (const r of rows) {
    await prisma.opportunity.upsert({
      where: { id: r.Id },
      create: {
        id: r.Id,
        name: r.Name,
        stageName: r.StageName,
        amount: r.Amount ?? null,
        closeDate: r.CloseDate ? new Date(r.CloseDate) : null,
        probability: r.Probability ?? null,
        type: r.Type ?? null,
        accountName: r.Account?.Name ?? null,
        ownerEmail: r.Owner?.Email ?? null,
        industry: r.Industry ?? null,
        source: 'salesforce',
      },
      update: {
        name: r.Name,
        stageName: r.StageName,
        amount: r.Amount ?? null,
        closeDate: r.CloseDate ? new Date(r.CloseDate) : null,
        probability: r.Probability ?? null,
        type: r.Type ?? null,
        accountName: r.Account?.Name ?? null,
        ownerEmail: r.Owner?.Email ?? null,
        industry: r.Industry ?? null,
        source: 'salesforce',
      }
    });
  }
  return Response.json({ ok: true, count: rows.length });
}
