import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.skill.findMany({ orderBy: { updatedAt: 'desc' } });
  return Response.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const item = await prisma.skill.create({ data });
  return Response.json(item, { status: 201 });
}
