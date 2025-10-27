import { prisma } from '@/lib/prisma';
export async function GET(){
  const latest = await prisma.kpiSnapshot.findFirst({ orderBy: { period: 'desc' } });
  return Response.json(latest||{});
}
