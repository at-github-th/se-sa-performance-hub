import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.opportunity.findMany({ orderBy: { updatedAt: 'desc' } });
  return Response.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const item = await prisma.opportunity.create({ data });
  return Response.json(item, { status: 201 });
}
